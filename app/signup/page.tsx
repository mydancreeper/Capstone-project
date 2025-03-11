"use client";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import Navbar from "../../components/navbar";
import { useState } from "react";

export default function Home() {
  const[exists, setExists] = useState("");

  async function SendSignupData(event: React.FormEvent) {
    event.preventDefault();

    const password = (document.getElementById("password") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;

    const response = await fetch(`/api/signup`, {method: "POST" , headers: {'Content-Type': 'application/json',}, body: JSON.stringify({username: username, password: password})})

    console.log(response.status)
    const data = await response.json();

    if (data.message == "User already exists") {
      setExists("User already exists");
      window.location.href = "/signup";
    }
    else if (data.message == "Sign up successful") {
      window.location.href = "/login";
    }
  }


  return (
    <div>
      <Navbar /> 
      <br />
      <br />
      <br />
      <div className = "max-w-screen-xl grid justify-items-center mx-auto p-4">
        <h1>Sign up</h1>
      </div>
      <div className = "max-w-screen-xl grid justify-items-center mx-auto p-4 ">
            <form method = "post" onSubmit={SendSignupData}>
                <input type="text" id = "username" name = "username" placeholder="Username" className = "text-black" required/>
                <br /><br />
                <input type="password" id = "password" name = "password" placeholder="Password"  className = "text-black" required/>
                <br /><br />
                <button type="submit" id = "signup_button" name = "signup_button" className = "bg-green-800 hover:bg-green-800 font-small rounded-lg px-3 py-1.5 border-2 border-solid dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            </form>
            <div className ="p-4 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400" role="alert">
              {exists}
            </div>
        </div>
    </div>
  );
}
