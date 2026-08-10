"use client";
import api from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { login } from "@/utils/serviceClient";
import LoaderLogin from "@/Components/LoaderLogin";
import { toast } from "@/Components/ui/toast";

const Page = () => {
  const router = useRouter();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [Dob, setDob] = useState("");
  const [show, setshow] = useState(false);
  const [Con_show, set_Conshow] = useState(false);
  const [loading, setloading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    const data = { username, email, password, date_of_birth: Dob };
    setloading(true)
    try {
      await api.post("app/student", data);
    } catch (error) {
      for (const field in error.response.data) {
        toast.add({"title":error.response.data[field][0]})
        setloading(false)
        return;
      }
    }
    const loginData = { username, password };
    login(loginData);
    setusername("");
    setpassword("");
    setemail("");
    setconfirm("");
    setDob("");
    router.push("/student");
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#2563eb_0%,#1e3a8a_45%,#0f172a_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[88vh] max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white/90 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:min-h-[85vh]">
        <div className="flex w-full flex-col justify-between bg-slate-950 px-6 py-8 text-white sm:px-8 lg:w-[42%] lg:px-10 lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              LearnForge
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              Create your learning account
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Join thousands of learners and start building your path with a modern, focused workspace.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            <p className="font-medium">Already have an account?</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-3 inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-slate-50 px-5 py-8 sm:px-8 lg:w-[58%] lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-7 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Sign up
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Create Account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fill in your details to get started in just a few moments.
              </p>
            </div>

            <form className="space-y-4" onSubmit={register}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="username">
                  Username
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              <div className="relative space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => setshow(!show)}
                  className="absolute right-3 top-[2.45rem] cursor-pointer text-slate-500 transition hover:text-slate-800"
                >
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </div>
              </div>

              <div className="relative space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="confirm">
                  Confirm Password
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  id="confirm"
                  type={Con_show ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  required
                />
                <div
                  onClick={() => set_Conshow(!Con_show)}
                  className="absolute right-3 top-[2.45rem] cursor-pointer text-slate-500 transition hover:text-slate-800"
                >
                  {Con_show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  id="dob"
                  type="date"
                  value={Dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              {loading ? (
                <LoaderLogin />
              ) : (
                <button className="flex h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 cursor-pointer">
                  Sign Up
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
