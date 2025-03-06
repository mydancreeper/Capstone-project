import {neon} from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function UpdateUsers(username:string ,password:string) {
    try {
        await sql `
            INSERT INTO users (username, password) 
            VALUES (${username}, ${password});
        `;
        console.log("User updated successfully");
    } 
    catch (error) {
        console.error("Error updating user:", error);
    }
}
