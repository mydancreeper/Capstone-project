"use client";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const[matches, setmatches] = useState("");

  async function SendLoginData(event: React.FormEvent) {
    event.preventDefault();

    const password = (document.getElementById("password") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;

    const response = await fetch(`/api/login`, {method: "POST" , body: JSON.stringify({username: username, password: password})})
    console.log(response.status)
    const data = await response.json();

    if (data.message == "Login successful") {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password)
      window.location.href = "/home";
    }
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
      <div className = "max-w-screen-xl grid justify-items-center mx-auto p-4 ">
        <h1>Log in</h1>
      </div>
      <div className = "max-w-screen-xl grid justify-items-center mx-auto p-4 ">
            <form method = "post" onSubmit = {SendLoginData}>
                <input type="text" id = "username" name = "username" placeholder="Username" className = "text-black" required />
                <br /><br />
                <input type="password" id = "password" name = "password" placeholder="Password" className = "text-black" required/>
                <br /><br />
                <button type="submit" id = "login_button" name = "login_button" className = "bg-green-800 hover:bg-green-800 font-small rounded-lg px-3 py-1.5 border-2 border-solid dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            </form>
            <div className ="p-4 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400" role="alert">
              {matches}
            </div>
        </div>
    </div>
  );
}
