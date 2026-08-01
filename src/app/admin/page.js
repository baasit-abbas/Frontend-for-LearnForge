"use client";
import LoaderLogin from "@/Components/LoaderLogin";
import api from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiVideoFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import { IoIosFlash } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import LineChartComp from "@/Components/LineChartComp";
import DisplayCard from "@/Components/DisplayCard";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-17">
      <main className="bg-slate-900 px-6 flex flex-col gap-8 h-full">
        <div className="py-4 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p>
            Manage your LearnForge students , instructors , courses , docs etc
          </p>
        </div>
        <div className="flex gap-3">
          <div className="w-[72%] flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 justify-around">
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count="20,000"
                average="10"
                month="5"
              />
            </div>
            <div className="bg-slate-700 p-3 flex flex-col gap-6">
              <h1 className="text-xl font-bold">Registerations Per Month</h1>
              <LineChartComp />
            </div>
          </div>
          <div className="w-[27%] bg-slate-700 text-gray-100 flex flex-col gap-6 px-3 py-4">
            <h1 className="font-bold text-xl">Averages</h1>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Average Quiz Score</p>
                <p>80%</p>
              </div>
              <div className="flex justify-between">
                <p>Average Quiz Score</p>
                <p>80%</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-xl">Remainings</h1>
              <div className="flex justify-between">
                <p>Total Quizes</p>
                <p>24</p>
              </div>
              <div className="flex justify-between">
                <p>Total Quizes</p>
                <p>24</p>
              </div>
              <div className="flex justify-between">
                <p>Total Quizes</p>
                <p>24</p>
              </div>
              <div className="flex justify-between">
                <p>Total Quizes</p>
                <p>24</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
