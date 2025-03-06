import {neon} from "@neondatabase/serverless"

const sql = neon("postgresql://CapstoneDB_owner:npg_GpE6oAHkM8sR@ep-delicate-star-abynrs6w-pooler.eu-west-2.aws.neon.tech/CapstoneDB?sslmode=require")

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
