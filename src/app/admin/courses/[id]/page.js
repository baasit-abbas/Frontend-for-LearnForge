"use client";
import AddDoc from "@/Components/AddDoc";
import AdminDocCard from "@/Components/AdminDocCard";
import StudentCard from "@/Components/StudentCard";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";

const Page = () => {
  const [course, setcourse] = useState({});
  const [selected, setselected] = useState("Students");
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const all_data = await api.get(`app/course/${id}`);
      setcourse(all_data.data);
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="flex flex-col gap-5 bg-slate-800 w-full h-full p-10 pt-12 text-gray-100">
      <header className="flex justify-between px-10 rounded-lg bg-slate-700 w-full py-6 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p>{course.description}</p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex flex-col gap-3">
           <AddDoc course_id={course.id} getter={course} setter={setcourse} />
            <button className="px-3 py-2 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 transition-all duration-300 cursor-pointer">
              Add Video
            </button>
          </div>
          <div className="p-6 rounded-full bg-slate-500">
            <FaBook size={80} />
          </div>
        </div>
      </header>
      <div className="w-full bg-slate-700 rounded-md h-10 flex justify-around">
        <button
          onClick={() => setselected("Students")}
          className={`font-bold text-xl h-full ${selected == "Students" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2`}
        >
          Current Enrolled Students
        </button>
        <button
          onClick={() => setselected("Documents")}
          className={`font-bold text-xl h-full ${selected == "Documents" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2`}
        >
          Uploaded Documents
        </button>
        <button
          onClick={() => setselected("Videos")}
          className={`font-bold text-xl h-full ${selected == "Videos" ? "bg-slate-900" : "bg-slate-600"} cursor-pointer rounded-md px-2`}
        >
          Uploaded Videos
        </button>
      </div>
      {selected == "Students" ? (
        <>
          {course.students?.length == 0 && (
            <div className="text-5xl font-bold text-center">
              No Students Found
            </div>
          )}
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
        </>
      ) : (
        <div className="flex flex-wrap gap-4">
          {course.docs?.length == 0 && (
            <div className="text-5xl font-bold">No Document Found</div>
          )}
          {course.docs?.map((doc) => {
            return (
              <AdminDocCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                fileType={doc.fileType}
                fileUrl={doc.fileUrl}
                course={course.title}
                instructor={course.instructor}
                getter={course}
                setter={setcourse}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
