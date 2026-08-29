"use client";
import DisplayCard from "@/Components/DisplayCard";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp, IoFlash } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
import LineChartComp from "@/Components/LineChartComp";

const Page = () => {
  const [student, setstudent] = useState([]);
  const [userProfile, setuserProfile] = useState();
  useEffect(() => {
    const loadData = async () => {
      const all_data = await api.get("app/student");
      setuserProfile(JSON.parse(localStorage.getItem("user")));
      setstudent(all_data.data);
    };
    loadData();
  }, []);

  return (
    <div className="bg-slate-900 mt-20 min-h-screen px-10 pb-5">
      <header className="flex flex-col justify-center-center gap-3 py-5">
        <h1 className="font-bold text-5xl">Welcome {userProfile?.username}</h1>
        <p>
          Every lesson you complete brings you one step closer to mastering your
          goals
        </p>
      </header>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-around gap-4 mt-8">
          <DisplayCard
            name="Enrolled Courses"
            icon={
              <p className="p-2 rounded-full bg-blue-500 text-gray-100">
                <FaBook size={35} />
              </p>
            }
            count={student?.total_courses}
            average={student?.average_enrolled}
            month={student?.enrolled_this_month}
          />
          <DisplayCard
            name="Completed Courses"
            icon={
              <p className="p-2 rounded-full bg-green-500 text-gray-100">
                <IoCheckmarkDoneCircleSharp size={35} />
              </p>
            }
            count={student?.completed_courses}
            average={student?.average_completed}
            month={student?.completed_this_month}
          />
          <DisplayCard
            name="In Progress Courses"
            icon={
              <p className="p-2 rounded-full bg-yellow-500 text-gray-100">
                <GrInProgress size={35} />
              </p>
            }
            count={student?.in_progress}
            average={student?.in_progress_average}
            month={student?.in_progress_this_month}
          />
        </div>
        <div className="flex gap-3 items-center justify-around w-full mt-10">
          <div className="flex items-center justify-center gap-3 bg-slate-700 rounded-lg py-2 w-70">
            <div className="p-2 rounded-full bg-slate-900 text-white">
              <MdQuiz size={20} />
            </div>
            <h1 className="text-lg font-bold ">Average Quiz Score</h1>
            <p>{student.average_quiz_score}%</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-slate-700 rounded-lg py-2 w-70">
            <div className="p-2 rounded-full bg-slate-900 text-white">
              <IoFlash size={20} />
            </div>
            <h1 className="text-lg font-bold">Flashcards Attempted</h1>
            <p>{student.flashcards_attempted}</p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-slate-700 rounded-lg py-2 w-70">
            <div className="p-2 rounded-full bg-slate-900 text-white">
              <IoCheckmarkDoneCircleSharp size={20} />
            </div>
            <h1 className="text-lg font-bold">Average Complition</h1>
            <p>{student.average_course_complition}%</p>
          </div>
        </div>
        <div className="bg-slate-700 p-3 flex flex-col gap-6 mt-10">
          <h1 className="text-xl font-bold">
            Enrolled Per Month
          </h1>
          <LineChartComp data={student?.per_month} />
        </div>
      </div>
    </div>
  );
};

export default Page;
