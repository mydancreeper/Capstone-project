"use client";
import { useState, useEffect} from "react";

// Sidebar component
export default function Sidebar() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("username");
        setUsername(storedUsername || "");
      }, [])

    return(
<nav >
  <div className="fixed top-0 left-0 h-full w-64 px-6 py-8 flex flex-col bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    
    <div className="flex items-center space-x-3 px-2 mb-10">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
         {/* &#39 is used to represent an apostrophe as Vercel doesn't accept a normal ' */}
        {username}&#39;s<br/>Dashboard
      </h1>
    </div>

    <div className="flex-1 flex flex-col space-y-2">
      <a 
        href="/home" 
        className="flex items-center px-4 py-3 text-sm font-medium rounded-lg
                 text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400
                 hover:bg-blue-50 dark:hover:bg-blue-900/30
                 transition-colors duration-200"
      > 
        Dashboard
      </a>
    </div>

    
  </div>
</nav>
    )
}