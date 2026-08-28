"use client";
import DisplayCard from "@/Components/DisplayCard";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { RiVideoAddFill } from "react-icons/ri";
import { SiGoogledocs } from "react-icons/si";
import { MdQuiz } from "react-icons/md";
import { IoFlash } from "react-icons/io5";
import LineChartComp from "@/Components/LineChartComp";
import AddCourseInstructor from "@/Components/AddCourseInstructor";

const Page = () => {
  const [instrcutor, setinstrcutor] = useState();
  const [user, setuser] = useState();
  useEffect(() => {
    const loadData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const all_data = await api.get("app/instructors");
      setinstrcutor(all_data.data);
      setuser(user);
    };
    loadData();
  }, []);

  return (
    <div className="bg-slate-900 mt-20 min-h-screen px-4">
      <header className=" px-7 py-4 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-5xl">Welcome {user?.username}</h1>
          <p>Manage your courses , docs , videos etc.</p>
        </div>
        <AddCourseInstructor />
      </header>
      <div className="mt-9 flex gap-2 w-full">
        <div className="flex flex-wrap gap-4 justify-around w-[75%]">
          <DisplayCard
            name="My Courses"
            icon={
              <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                <FaBook size={35} />
              </p>
            }
            count={instrcutor?.total_courses}
            average={instrcutor?.average_courses}
            month={instrcutor?.courses_this_month}
          />
          <DisplayCard
            name="Students"
            icon={
              <p className="p-2 rounded-full bg-blue-700 text-gray-100">
                <PiStudentBold size={35} />
              </p>
            }
            count={instrcutor?.total_students}
            average={instrcutor?.average_students}
            month={instrcutor?.students_this_month}
          />
          <DisplayCard
            name="My Doucments"
            icon={
              <p className="p-2 rounded-full bg-purple-500 text-gray-100">
                <SiGoogledocs size={35} />
              </p>
            }
            count={instrcutor?.total_docs}
            average={instrcutor?.average_docs}
            month={instrcutor?.docs_this_month}
          />
          <DisplayCard
            name="My Videos"
            icon={
              <p className="p-2 rounded-full bg-cyan-500 text-gray-100">
                <RiVideoAddFill size={35} />
              </p>
            }
            count={instrcutor?.total_videos}
            average={instrcutor?.average_videos}
            month={instrcutor?.videos_this_month}
          />
          <DisplayCard
            name="Quizes"
            icon={
              <p className="p-2 rounded-full bg-green-600 text-gray-100">
                <MdQuiz size={35} />
              </p>
            }
            count={instrcutor?.total_quizes}
            average={instrcutor?.average_quizes}
            month={instrcutor?.quizes_this_month}
          />
          <DisplayCard
            name="Flashcards"
            icon={
              <p className="p-2 rounded-full bg-blue-500 text-gray-100">
                <IoFlash size={35} />
              </p>
            }
            count={instrcutor?.total_flashcards}
            average={instrcutor?.average_flashcards}
            month={instrcutor?.flashcards_this_month}
          />
        </div>
        <div className="w-[25%] bg-slate-700 flex flex-col gap-3 py-4 px-2">
          <h1 className="text-2xl font-bold">Averages</h1>
          <div className="flex justify-between items-center">
            <h1>Avergae Course Complition:</h1>
            <p>{instrcutor?.average_course_complition}%</p>
          </div>
          <div className="flex justify-between items-center">
            <h1>Avergae Quiz Score : </h1>
            <p>{instrcutor?.average_quiz_score}%</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 p-3 flex flex-col gap-6 mt-6">
        <h1 className="text-xl font-bold">Registerations Per Month in your courses</h1>
        <LineChartComp data={instrcutor?.registeration_per_month} />
      </div>
    </div>
  );
};

export default Page;
