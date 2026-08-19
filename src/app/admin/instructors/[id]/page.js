"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiTeacher } from "react-icons/gi";

const Page = () => {
  const [selected, setselected] = useState("Courses");
  const params = useParams();
  const [instructor, setinstructor] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const data = await api.get(`app/instructor/${id}`);
      setinstructor(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="py-8 px-10 flex flex-col gap-6 min-h-screen bg-slate-800">
      <header className="rounded-md bg-slate-700 flex justify-between items-center px-10 text-gray-100 w-full h-40">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold">
            {instructor.username}&apos;s Page
          </h1>
          <p className="text-slate-300">
            {instructor.username} has specialization in{" "}
            {instructor.specialization}{" "}
            {instructor.experience_years != 0 &&
              `and has experience of ${instructor.experience_years} years`}
          </p>
        </div>
        <div className="rounded-full p-5 bg-slate-800">
          <GiTeacher size={80} />
        </div>
      </header>
      <div className="w-full bg-slate-700 rounded-md flex justify-around py-2">
        <button
          onClick={() => setselected("Courses")}
          className={`font-bold text-xl h-full ${selected == "Courses" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Courses
        </button>
        <button
          onClick={() => setselected("Documents")}
          className={`font-bold text-xl h-full ${selected == "Documents" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Documents
        </button>
        <button
          onClick={() => setselected("Videos")}
          className={`font-bold text-xl h-full ${selected == "Videos" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Videos
        </button>
      </div>
      {selected == "Courses" ? (
        <>
          {instructor.courses?.length == 0 && (
            <div className="font-bold text-5xl text-center">
              No Courses Found
            </div>
          )}
          <div className="flex flex-wrap gap-6">
            {instructor.courses?.map((course) => {
            return (
                
              <AdminCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                instructor={instructor.username}
                progress={course.progress}
                setter={setinstructor}
                getter={instructor}
              />
            );
          })}
          </div>
          
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
