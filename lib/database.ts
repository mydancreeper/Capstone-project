import {neon} from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GetUser(username:string ,password:string) {
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

export async function UpdateUsers(username:string ,password:string) {
    const user = await GetUser(username, password);
        if (user!.length != 0) {
            console.log("User already exists")
            return false;
        }
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

export async function ValidateUser(username:string ,password:string) {
    try {
        const user = await sql `
            SELECT * FROM users
            WHERE username = ${username} AND password = ${password};
        `;
        console.log(user)
        if (user!.length === 1) {
            console.log("User info matches")
            return true;
        }
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
