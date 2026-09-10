"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import { WrapperContext } from "@/Components/Wrapper";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { PiStudentFill } from "react-icons/pi";

const Page = () => {
  const [students, setstudents] = useState([]);
  const params = useParams();
  const { toggleTheme } = useContext(WrapperContext);
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const all_data = await api.get(`app/student/${id}`);
      setstudents(all_data.data);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`min-h-screen ${toggleTheme ? "bg-slate-300 text-slate-800" : "bg-slate-900 text-slate-100"} p-3 pt-10 flex flex-col gap-4`}
    >
      <header
        className={`flex items-center justify-between rounded-xl w-full ${toggleTheme ? "bg-slate-100 text-slate-800" : "bg-slate-700 text-slate-100"}  md:px-20 px-5 h-45`}
      >
        <div className="flex flex-col md:gap-5 gap-3">
          <h1 className="font-bold md:text-5xl text-2xl">
            {students.username}&apos;s Page
          </h1>
          <p>Education is the passport to the future, So learn more and more</p>
        </div>
        <div
          className={`p-2 rounded-full ${toggleTheme ? "bg-slate-200" : "bg-slate-600"}`}
        >
          <PiStudentFill size={110} />
        </div>
      </header>
      <div className="flex flex-col gap-5">
        <div
          className={`p-2 rounded-lg flex items-center justify-between ${toggleTheme ? "bg-slate-200 text-slate-700" : "bg-slate-600 text-slate-100"}`}
        >
          <h1 className="font-bold">Current Running Courses</h1>
        </div>
        {students.courses?.length == 0 && (
          <div
            className={`text-5xl text-center mt-10 ${toggleTheme ? "text-slate-800" : "text-slate-100"}`}
          >
            No Courses Found
          </div>
        )}
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
