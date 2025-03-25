"use client";
import Navbar from "../../components/navbar";
import { useState } from "react";

export default function Home() {
  // Used to store whether the user already exists or not
  const[exists, setExists] = useState("");

  //function to send the sign up data to the backend and check if the username is already in the user table
  async function SendSignupData(event: React.FormEvent) {
    event.preventDefault();

    // Gets the values from the form inputs
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;

    const response = await fetch(`/api/signup`, {method: "POST" , headers: {'Content-Type': 'application/json',}, body: JSON.stringify({username: username, password: password})})

    console.log(response.status)
    const data = await response.json();

    // If the user already exists, an error message is displayed and the page is reloaded
    if (data.message === "User already exists") {
      setExists("User already exists");
      window.location.href = "/signup";
    }
    // If the user is successfully signed up, the user is redirected to the login page
    else if (data.message === "Sign up successful") {
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sign up</h1>
      </div>

     
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50">
        <form method="post" onSubmit={SendSignupData} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
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
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            id="signup_button"
            name="signup_button"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Create Account
          </button>
        </form>

        {/* Error message */}
        {exists && (
          <div className="mt-6 p-4 text-sm text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-lg" role="alert">
            {exists}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
