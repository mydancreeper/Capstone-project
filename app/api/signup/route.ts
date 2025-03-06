import { NextRequest} from "next/server";
import { UpdateUsers } from "../../../lib/database";

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const password = data.password;
    const username = data.username;

    UpdateUsers(username, password);
}