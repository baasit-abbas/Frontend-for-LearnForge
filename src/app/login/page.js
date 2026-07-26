"use client";
import LoaderLogin from "@/Components/LoaderLogin";
import api from "@/utils/authClient";
import { login } from "@/utils/serviceClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";



const Page = () => {

  const router = useRouter()

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password,
    };
    setloading(true)
    const user = await login(data)
    setloading(false)
    if (!user){
      return
    }
    if (user.role == 'Admin'){
      router.push('/admin')
    }
    else if (user.role == 'Instructor'){
      router.push('/instructor')
    }
    else{
      router.push('/student')
    }

  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top,#1f2937_0%,#0b1220_42%,#050816_100%)] text-slate-900">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-[18%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-[15%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between border-b border-white/10 bg-white/5 p-10 text-white lg:flex lg:border-b-0 lg:border-r">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">
                LearnForge
              </p>
              <h1 className="mt-5 max-w-md text-5xl font-semibold tracking-tight">
                Welcome back to your learning workspace.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-200/80">
                Sign in to continue building lessons, tracking progress, and picking up exactly where you left off.
              </p>
            </div>

            <div className="grid gap-4 text-sm text-slate-200/85">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Clean dashboard access in one step.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                Fast, focused, and built for deep work.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200/70 bg-white/95 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                  Sign in
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Welcome back
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Enter your credentials to access your account.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setshow(!show)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition hover:text-slate-800 cursor-pointer"
                    >
                      {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                  </div>
                </div>
                {loading ? <LoaderLogin />:<button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/20 cursor-pointer"
                >
                  <span>Submit</span>
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>}
                
              </form>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-600">
                <span>Don&apos;t have an account?</span>{" "}
                <Link
                  className="font-semibold text-cyan-700 underline-offset-4 transition hover:text-cyan-800 hover:underline"
                  href={'/register'}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
