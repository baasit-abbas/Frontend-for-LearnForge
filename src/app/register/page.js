"use client";
import api from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [Dob, setDob] = useState("");
  const [show, setshow] = useState(false);
  const [Con_show, set_Conshow] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return
    }
    const data = { username, email, password, date_of_birth: Dob }
    console.log(data)
    let response = ''
    try {
      response = await api.post("app/student", data);
    } catch (error) {
      for (const field in error.response.data) {
        toast.error(error.response.data[field][0]);
        return
      }
    }
    setusername('')
    setpassword('')
    setemail('')
    setconfirm('')
    setDob('')
    router.push("/student");
  };

  return (
    <div className="bg-blue-500 h-screen w-screen text-gray-100 flex items-center justify-center">
      <div className="w-[70%] h-[85%] flex">
        <div className="w-[40%] h-full bg-blue-700 flex flex-col items-center justify-center gap-5">
          <h1 className="text-6xl font-bold text-gray-100">Get Started</h1>
          <div className="flex flex-col gap-2">
            <p className="text-gray-100 ">Already have an account?</p>
            <button onClick={() => router.push('/login')} className="border-2 border-gray-100 text-gray-100 px-6 py-4 rounded-2xl bg-transparent cursor-pointer hover:bg-gray-100 hover:border-blue-400 hover:text-blue-500 transition-all duration-300 outline-none">
              Log In
            </button>
          </div>
        </div>
        <div className="w-[60%] h-full bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col gap-5 w-[60%] h-full items-center justify-center">
            <h1 className="text-blue-600 text-5xl font-bold">Create Account</h1>
            <form
              className="flex flex-col items-center justify-center w-full text-gray-800 gap-3"
              onSubmit={register}
            >
              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-800" htmlFor="username">
                  Username:
                </label>
                <input
                  className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-600 py-2 px-5 focus:outline-none"
                  id="username"     
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <input
                  className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-600 py-2 px-5 focus:outline-none"
                  id="email"     
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full relative">
                <label className="text-gray-800" htmlFor="password">
                  Password:
                </label>
                <input
                  className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-600 py-2 px-5 focus:outline-none pr-10"
                  id="password"     
                  type={show? "text":"password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <div onClick={() => setshow(!show)} className="absolute top-11 right-3 text-blue-500 hover:text-blue-800 transition-all duration-300 cursor-pointer">
                    {show ? <FaEye size={20} /> : <FaEyeSlash size={20}/>}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full relative">
                <label className="text-gray-800" htmlFor="confirm">
                  Confirm Password:
                </label>
                <input
                  className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-600 py-2 px-5 focus:outline-none pr-10"
                  id="confirm"     
                  type={Con_show? "text":"password"}
                  placeholder="Confirm your passowrd"
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  required
                />
                <div onClick={() => set_Conshow(!Con_show)} className="absolute top-11 right-3 text-blue-500 hover:text-blue-800 transition-all duration-300 cursor-pointer">
                    {Con_show ? <FaEye size={20} /> : <FaEyeSlash size={20}/>}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-gray-800" htmlFor="dob">
                  Date of birth:
                </label>
                <input
                  className="w-full rounded-lg border-2 border-blue-200 focus:border-blue-600 py-2 px-5 focus:outline-none"
                  id="dob"     
                  type="date"
                  placeholder="Enter Date"
                  value={Dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <button className="bg-blue-500 w-full py-3 text-green-100 rounded-lg font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
