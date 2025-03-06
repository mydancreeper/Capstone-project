import { NextRequest, NextResponse } from "next/server";
import { UpdateUsers } from "../../../lib/database";

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    let password = data.password;
    let username = data.username;

    UpdateUsers(username, password);
}