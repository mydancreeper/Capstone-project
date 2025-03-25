import { NextRequest, NextResponse} from "next/server";
import { UpdateUsers } from "../../../lib/database";

export async function POST(request: NextRequest) {
    //handles the sign up form submission from the sign up page
    const data = await request.json();
    
    const password = data.password;
    const username = data.username;

    //updates the user table with the new user if the username isn't already used
    const updated = await UpdateUsers(username, password)
    if (updated === true) {
        return NextResponse.json({message: "Sign up successful"});
    }
    else if (updated === false) {
        return NextResponse.json({message: "User already exists"});
    }
}
