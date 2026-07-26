
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[radial-gradient(circle_at_top,#2563eb_0%,#1e3a8a_45%,#0f172a_100%)] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-4xl border border-white/10 bg-white/10 px-6 py-16 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/80">
          LearnForge
        </p>
        <h1 className="mt-6 text-center text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Learn smarter. Build faster. Grow with confidence.
        </h1>
        <p className="mt-5 max-w-2xl text-center text-base leading-7 text-slate-200 sm:text-lg">
          Welcome to LearnForge, your modern learning workspace for students, instructors, and admins.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-2xl bg-white px-7 py-3 text-center font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-2xl border border-white/20 bg-transparent px-7 py-3 text-center font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
