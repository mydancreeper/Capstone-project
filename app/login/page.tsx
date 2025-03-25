"use client";
import Navbar from "../../components/navbar";
import { useState } from "react";

export default function Home() {
  // Used to store whether the login was successful or not
  const[matches, setmatches] = useState("");

  //function to send the login data to the backend and check if it matches an entry in the user table
  async function SendLoginData(event: React.FormEvent) {
    event.preventDefault();

    // Gets the values from the form inputs
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;

    // Sends request to the server to validate the user with the entered username and password
    const response = await fetch(`/api/login`, {method: "POST" , body: JSON.stringify({username: username, password: password})})
    console.log(response.status)
    const data = await response.json();

    // If the user is validated, the username is stored in the session storage and the user is redirected to the home page
    if (data.message == "Login successful") {
        sessionStorage.setItem("username", username);
      window.location.href = "/home";
    }

    // If the user isn't validated, an error message is displayed and the page is reloaded
    else if (data.message == "Login failed") {
      setmatches("Login failed");
      window.location.href = "/login";
    }
  }

  return (
    <div>
      <Navbar /> 
      <br />
      <br />
      <br />
      <div className="max-w-screen-xl mx-auto p-4">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Log in</h1>
      </div>

      
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50">
        <form method="post" onSubmit={SendLoginData} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:bg-gray-700 dark:text-white transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:bg-gray-700 dark:text-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            id="login_button"
            name="login_button"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Log In
          </button>
        </form>

        {/* Error Message */}
        {matches && (
          <div className="mt-6 p-4 text-sm text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-lg" role="alert">
            {matches}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
