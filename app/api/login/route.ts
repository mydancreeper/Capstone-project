import { NextRequest, NextResponse} from "next/server";
import { ValidateUser } from "../../../lib/database";

export async function POST(request: NextRequest) {
    //handles the login form submission from the login page

    const data = await request.json();
    
    const password = data.password;
    const username = data.username;

    //validates the user by checking the username and password match a entry in the user table
    const validated = await ValidateUser(username, password)
    if (validated === true) {
        return NextResponse.json({message: "Login successful"});
    }
    else {
        return NextResponse.json({message: "Login failed"});
    }
}