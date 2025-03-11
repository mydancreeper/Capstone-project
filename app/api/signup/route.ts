import { NextRequest, NextResponse} from "next/server";
import { UpdateUsers } from "../../../lib/database";

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const password = data.password;
    const username = data.username;

    const updated = await UpdateUsers(username, password)
    if (updated === true) {
        return NextResponse.json({message: "Sign up successful"});
    }
    else if (updated === false) {
        return NextResponse.json({message: "User already exists"});
    }
}
