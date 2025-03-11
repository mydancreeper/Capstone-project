import { NextRequest, NextResponse} from "next/server";
import { ValidateUser } from "../../../lib/database";

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const password = data.password;
    const username = data.username;

    const validated = await ValidateUser(username, password)
    if (validated === true) {
        return NextResponse.json({message: "Login successful"});
    }
    else {
        return NextResponse.json({message: "Login failed"});
    }
}