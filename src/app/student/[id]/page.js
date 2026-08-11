"use client";
import CourseCard from "@/Components/CourseCard";
import api from "@/utils/authClient";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { PiStudentFill } from "react-icons/pi";

const Page = () => {
  const [students, setstudents] = useState([]);
  const [role, setrole] = useState("");
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const all_data = await api.get(`app/student/${id}`);
      setstudents(all_data.data);
      setrole(JSON.parse(localStorage.getItem("user")).role);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-3 pt-10 flex flex-col gap-4">
      <header className="flex items-center justify-between rounded-xl w-full bg-slate-700 px-20 h-45">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-5xl">
            {role == "Admin"
              ? `${students.username}'s Page`
              : `Welcome ${students.username}!`}
          </h1>
          <p>Education is the passport to the future, So learn more and more</p>
        </div>
        <div className="p-2 rounded-full bg-slate-600">
          <PiStudentFill size={110} />
        </div>
      </header>
      <div className="flex flex-col gap-5">
        <div className="p-2 rounded-lg flex items-center justify-between bg-slate-600">
          <h1 className="text-gray-100 font-bold">Current Running Courses</h1>
          <Link
            href="/courses"
            className="bg-slate-800 hover:bg-slate-700 rounded-lg border-none outline-none px-3 py-2 cursor-pointer"
          >
            View all Courses
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {students.courses?.map((course) => {
            return (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                progress={course.progress}
                role={role}
                setter={setstudents}
                getter={students}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
