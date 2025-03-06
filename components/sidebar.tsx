"use client";

export default function Sidebar() {
    return(
        <nav className="h-full bg-white border-gray-200 dark:bg-gray-600">
            <div className="fixed top-0 left-0 h-full w-1/6 px-3 py-4 bg-gray-200 dark:bg-gray-600">
                <a href ="/home" className="text-2xl block py-2 px-3 font-bold text-center">Dashboard</a>
                <a href="/tasks" className= "text-center block py-2 px-3 text-black rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Tasks</a>
            </div>
        </nav>
    )
}