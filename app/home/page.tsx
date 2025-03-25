"use client";
import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";

function TaskForm() {
  const [username, setUsername] = useState("");

  //Gets the username from the session storage so it can be passed on in the fetch requests later
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []) 

  async function submitted(event: React.FormEvent) {
    event.preventDefault();
    
    // Gets the values from the form inputs
    const title = (document.getElementById("Title") as HTMLInputElement).value;
    const description = (document.getElementById("Description") as HTMLInputElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;

    // Sends the data to the server to update the tasks table in the database
    // The username is also sent to so it can be used to search the database for tasks set by the user later
    const response = await fetch(`/api/home`, {method: "POST" , body: JSON.stringify({title: title, description: description, username: username, date: date})})
    console.log(response.status)
    window.location.href = "/home";}

  return(
    // Form for adding a task
<form method="post" onSubmit={submitted} className="w-[35rem] mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
  <div className="mb-6">
    <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      Title
    </label>
    <input
      type="text"
      id="Title"
      name="Title"
      placeholder="Enter task title..."
      className="w-full px-4 py-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 transition-all"
      required
    />
  </div>

  <div className="mb-6">
    <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      Description
    </label>
    <textarea
      id="Description"
      name="Description"
      placeholder="Enter task description..."
      rows={5}
      className="w-full px-4 py-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 transition-all"
    />
  </div>
  
  <div className="mb-6">
    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      Due Date
    </label>

    <input 
    type="date"
    id = "date"
    name = "date"
    className="w-full px-4 py-3 text-gray-800 dark:text-white bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 transition-all"
    required
    />
  </div>
   
  <div className="flex justify-end">
    <button
      type="submit"
      id="task_button"
      name="task_button"
      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors shadow-sm"
    >
      Submit Task
    </button>
  </div>
</form>
  )
}

function Tasks() {
  // This array is used to store the tasks that will be fetched from the database
  const [tasks, setTasks] = useState([]);

  //Gets the username from the session storage and calls upon the showTasks function
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      showTasks(storedUsername!);
    }
  }, [])
  
  //Whenever the array contain tasks is updated, the tasks are logged to the console
  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);
  
  // Requests the server to fetch the tasks from the database using the username to search for tasks set specifically by the user
  async function showTasks(username: string) {
    const response = await fetch('/api/home', {method: "GET", headers: {"username": username}})
    console.log(response.status)
    const data = await response.json();
    console.log(data)
    // Sets the task array to the tasks fetched from the database
    setTasks(data)
    return 
    }
   
  // Sends a request to the server to delete a task from the database using the task id
  async function deleteTask(id: number) {
    const response = await fetch('/api/home', {method: "DELETE", body: JSON.stringify({id: id})})
    console.log(response.status)
    window.location.href = "/home";
    return
  }

  return(
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Tasks</h1>
      {/* uses the map function to display the following html for each item in the tasks array */}
      {tasks.map((task: any, index: number) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
        >
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{task.title}</h1>
            <hr className = "border-[1px] w-[40rem]"/>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">{new Date(task.date).toISOString().split('T')[0]}</p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => deleteTask(task.id)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Mark as Done
            </button>
          </div>
        </div>
      ))}
</div>
  )
}

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Function to reveal the task form when the add task button is clicked
  function RevealTaskForm() {
    setShowTaskForm(true);
  } 

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64"> 
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              To Do List
            </h1>
            <button
              onClick={RevealTaskForm}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Add Task
            </button>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-700 my-6" />

          <Tasks />

          {/* Shows the task form when add task is clicked at the bottom of all the tasks */}
          <div className={`mt-8 transition-all duration-200 ${showTaskForm ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            {showTaskForm && <TaskForm />}
          </div>
        </div>
      </main>
</div>
  );
}



