"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { PiStudentFill } from "react-icons/pi";

const Page = () => {
  const [students, setstudents] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const all_data = await api.get(`app/student/${id}`);
      setstudents(all_data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-3 pt-10 flex flex-col gap-4">
      <header className="flex items-center justify-between rounded-xl w-full bg-slate-700 px-20 h-45">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-5xl">
            {students.username}&apos;s Page
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
        </div>
        <div className="flex flex-wrap gap-3">
          {students.courses?.map((course) => {
            return (
              <AdminCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                progress={course.progress}
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
