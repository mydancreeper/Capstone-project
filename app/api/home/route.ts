import { NextRequest, NextResponse} from "next/server";
import {UpdateTasks, GetTasks, DeleteTask} from "../../../lib/database";

export async function POST(request: NextRequest) {
    //handles the add task form submission from the homepage
    const data = await request.json();
    
    //parses the data from the request
    const title = data.title;
    const description = data.description;
    const username = data.username;
    const date = data.date;

    //updates the tasks table in the database by calling on the Update Tasks function defined in the database.ts
    const updated = await UpdateTasks(title, description, username, date)
    if (updated === true) {
        return NextResponse.json({message: "Task added successfully"});
    }
    else if (updated === false) {
        return NextResponse.json({message: "Task was not added"});
    }
}

export async function GET(request: NextRequest) {
    //handles getting the tasks from the task table to display on the homepage
    const username = request.headers.get("username")!

    //Gets the tasks from the task table with the same username as the user
    //usernames are unique so there is no need to check for multiple users with the same username
    const tasks = await GetTasks(username)
    if (tasks) {
        return NextResponse.json(tasks);
    }
    else {
        return NextResponse.json({message: "No tasks found"});
    }
}

export async function DELETE(request: NextRequest) {
    //handles deleting a task from the task table when the mark as done button is pressed
    const data = await request.json();

    //deletes the task from the task table by calling on the DeleteTask function defined in the database.ts
    const deleted = await DeleteTask(data.id)
    if (deleted === true) {
        return NextResponse.json({message: "Task deleted successfully"});
    }
    else if (deleted === false) {
        return NextResponse.json({message: "Task was not deleted"});
    }
}