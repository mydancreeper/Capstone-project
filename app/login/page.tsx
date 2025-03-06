"use client";
import Image from "next/image";
import Navbar from "../../components/navbar";

export default function Home() {

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
            <form method = "post" action = "/home">
                <input type="text" id = "username" name = "username" placeholder="Username" className = "text-black" required />
                <br /><br />
                <input type="password" id = "password" name = "password" placeholder="Password" className = "text-black" required/>
                <br /><br />
                <button type="submit" id = "login_button" name = "login_button" className = "bg-green-800 hover:bg-green-800 font-small rounded-lg px-3 py-1.5 border-2 border-solid dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
            </form>
        </div>
    </div>
  );
}
