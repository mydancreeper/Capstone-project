"use client";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";

function TaskForm() {
  const[tasks,SetTasks] = useState(0);

  function submitted() {
    SetTasks(tasks+1)
    alert("Task submitted");
  }

  return(
    <form method = "post" action = "/tasks" onSubmit ={submitted}>
                <input className = "w-[30rem] h-[2rem] rounded-lg bg-[#f8f8f8] text-black" type="text" id = "Title" name = "Title" placeholder="Title" />
                <br /><br />
                <textarea className = "w-[30rem] h-[10rem] rounded-lg bg-[#f8f8f8] text-black" id = "Description" name = "Description" placeholder="Description" />
                <br />
                <button type="submit" id = "task_button" name = "task_button" className = "bg-amber-500 hover:bg-amber-800 font-small rounded-lg px-3 py-1.5 border-2 border-solid dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-green-800">Submit</button>
    </form>
  )
}

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function RevealTaskForm() {
    setShowTaskForm(true);
  }

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("password");
    const storedUsername = sessionStorage.getItem("username");
    setPassword(storedPassword || "");
    setUsername(storedUsername || "");
  }, []) 

  return (
    <div> 
      <Sidebar /> 
      <div className ="max-w-screen-xl grid justify-items-center mx-auto p-4 ">
        <h1 className="text-2xl font-bold text-center"> To do list</h1>
        <button className ="" onClick={RevealTaskForm}>Add Task</button>
        <hr className = "border-[1px] w-[30rem]"/>
        <div className ="relative top-[2rem]">
          {showTaskForm ? <TaskForm /> : null}
        </div>
        <p>Username: {username}</p>
        <p>Password: {password}</p>
      </div>
   </div>
  );
}



