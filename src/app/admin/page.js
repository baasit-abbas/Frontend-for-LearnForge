"use client";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiVideoFill } from "react-icons/ri";
import LineChartComp from "@/Components/LineChartComp";
import DisplayCard from "@/Components/DisplayCard";
import AdminItem from "@/Components/AdminItem";

const Page = () => {
  const [data, setdata] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get('app/adminData')
      setdata(data.data)
    }
    fetchData()
  }, [])
  
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
                name="Users"
                icon={
                  <p className="p-2 rounded-full bg-orange-500 text-gray-100">
                    <FaUsers size={35} />
                  </p>
                }
                count={data.total_users}
                average={data.average_users}
                month={data.recent_users}
              />
              <DisplayCard
                name="Students"
                icon={
                  <p className="p-2 rounded-full bg-blue-700 text-gray-100">
                    <PiStudentBold size={35} />
                  </p>
                }
                count={data.total_students}
                average={data.average_students}
                month={data.recent_students}
              />
              <DisplayCard
                name="Instructors"
                icon={
                  <p className="p-2 rounded-full bg-purple-500 text-gray-100">
                    <GiTeacher size={35} />
                  </p>
                }
                count={data.total_instructors}
                average={data.average_instrctors}
                month={data.recent_instructors}
              />
              <DisplayCard
                name="Courses"
                icon={
                  <p className="p-2 rounded-full bg-cyan-500 text-gray-100">
                    <FaBook size={35} />
                  </p>
                }
                count={data.total_courses}
                average={data.average_courses}
                month={data.recent_courses}
              />
              <DisplayCard
                name="Documents"
                icon={
                  <p className="p-2 rounded-full bg-green-600 text-gray-100">
                    <SiGoogledocs size={35} />
                  </p>
                }
                count={data.total_docs}
                average={data.average_docs}
                month={data.recent_docs}
              />
              <DisplayCard
                name="Videos"
                icon={
                  <p className="p-2 rounded-full bg-blue-500 text-gray-100">
                    <RiVideoFill size={35} />
                  </p>
                }
                count={data.total_videos}
                average={data.average_videos}
                month={data.recent_videos}
              />
            </div>
            <div className="bg-slate-700 p-3 flex flex-col gap-6">
              <h1 className="text-xl font-bold">Registerations Per Month</h1>
              <LineChartComp data={data.registeration_per_month} />
            </div>
          </div>
          <div className="w-[27%] bg-slate-700 text-gray-100 flex flex-col gap-6 px-3 py-4">
            <h1 className="font-bold text-xl">Averages</h1>
            <div className="flex flex-col gap-2">
              <AdminItem text = 'Average Quiz Score' average={data.averge_quiz_socre + '%'}/>
              <AdminItem text = 'Average Course Complition' average={data.averge_course_complition+ '%'}/>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-xl">Remainings</h1>
                <AdminItem text = 'Total Quizes Generated' average={data.total_quizes}/>
                <AdminItem text = 'Total Flashcards Generated' average={data.total_flashcards}/>
                <AdminItem text = 'Total AI Chats' average={data.total_ai_chats}/>
                <AdminItem text = 'Total Active Users' average={data.total_active_users}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
