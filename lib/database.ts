import {neon} from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Function to get the user from the table, it's used in the Update user function to check if the user already exists
export async function GetUser(username:string) {
    try {
        const users = await sql `
            SELECT * FROM users
            WHERE username = ${username};
        `;
        console.log(users)
        return users;
    } 
    catch (error) {
        console.error("Error getting user:", error);
    }
}

// Function to update the user table with the new user, called upon in the sign up route
export async function UpdateUsers(username:string ,password:string) {
    const user = await GetUser(username);
        // If the user already exists, the function returns false
        if (user!.length != 0) {
            console.log("User already exists")
            return false;
        }
        //Otherwise the user is added to the table and the function returns true, assuming no error occurs
    try {
        await sql `
            INSERT INTO users (username, password) 
            VALUES (${username}, ${password});
        `;
        console.log("User table updated successfully");
        
        return true;
    } 
    catch (error) {
        console.error("Error updating user:", error);
        return false;
    }
}

// Function to validate the user, called upon in the login route
export async function ValidateUser(username:string ,password:string) {
    try {
        // searches for entries where the username and the password is the same as the input
        const user = await sql `
            SELECT * FROM users
            WHERE username = ${username} AND password = ${password};
        `;
        console.log(user)
        // If the user exists, the function returns true
        if (user!.length === 1) {
            console.log("User info matches")
            return true;
        }
        // else it returns false
        else {
            console.log("User info does not match")
            return false;
        }
    }

    catch (error)   {
        console.error("Error validating user:", error);
        return false;   
    }
}

// function used to update the tasks table, called upon in the home route when a POST request is sent
export async function UpdateTasks(title:string, description:string, username:string, date:Date) {
    try {
        // inserts entry into the database with all the relevant values
        await sql `
            INSERT INTO tasks (title, description, username, date) 
            VALUES (${title}, ${description}, ${username}, ${date});
        `;
        console.log("Task table updated successfully");
        return true;
    } 
    catch (error) {
        console.error("Error updating tasks:", error);
        return false;
    }
}

// function to get tasks from the task table, called upon in the home route when a GET request is sent
export async function GetTasks(username:string) {
    try {
        // Get the entries from the task table with the same username and in ascending order of their dates
        const tasks = await sql `
            SELECT * FROM tasks
            WHERE username = ${username}
            ORDER BY date ASC;
            `
            ;
        console.log(tasks)
        return tasks;
    }

    catch (error) {
        console.error("Error getting tasks:", error);
        return false;
    }
}

// function to delete tasks from the task table, called upon in the home route when a DELETE request is sent
export async function DeleteTask(id:string) {
    try {
        await sql `
            DELETE FROM tasks
            WHERE id = ${id};
        `;
        console.log("Task deleted successfully");
        return true;
    }

    catch (error) {
        console.error("Error deleting task:", error);
        return false;
    }
}
