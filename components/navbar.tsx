"use client";

// Navbar component
export default function Navbar() {
    
    return(
<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-end h-16">

      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Sign up
        </a>
        
      </div>
    </div>
  </div>
</nav>
    )    
}
