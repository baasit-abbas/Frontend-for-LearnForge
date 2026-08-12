"use client";
import StudentCard from "@/Components/StudentCard";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";

const Page = () => {
  const [course, setcourse] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const all_data = await api.get(`app/course/${id}`);
      setcourse(all_data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-slate-800 w-full h-full p-10 pt-12 text-gray-100">
      <header className="flex justify-between px-10 rounded-lg bg-slate-700 w-full py-6 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p>{course.description}</p>
        </div>
        <div className="p-6 rounded-full bg-slate-500">
          <FaBook size={80} />
        </div>
      </header>
      <div className="w-full py-2 px-3 bg-slate-700 rounded-md">
        <h1 className="font-bold text-xl">Current Enrolled Students</h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {course.students?.map((std) => {
          return (
            <StudentCard
              key={std.id}
              id={std.id}
              username={std.username}
              email={std.email}
              last_login={
                std.last_login
                  ? std.last_login.split("T")[0]
                  : "Not logged in yet"
              }
              date_of_birth={std.date_of_birth.split("T")[0]}
              getter={course}
              setter={setcourse}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
