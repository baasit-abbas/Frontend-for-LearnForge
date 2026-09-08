"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import AdminDocCard from "@/Components/AdminDocCard";
import AdminVideoCard from "@/Components/AdminVideoCard";
import { WrapperContext } from "@/Components/Wrapper";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { GiTeacher } from "react-icons/gi";

const Page = () => {
  const [selected, setselected] = useState("Courses");
  const params = useParams();
  const [instructor, setinstructor] = useState({});
  const { toggleTheme } = useContext(WrapperContext);
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      const data = await api.get(`app/instructor/${id}`);
      setinstructor(data.data);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`py-8 px-10 flex flex-col gap-6 min-h-screen ${toggleTheme ? "bg-slate-100 text-slate-800" : "bg-slate-700 text-slate-100"}`}
    >
      <header
        className={`rounded-md ${toggleTheme ? "bg-slate-300 " : "bg-slate-600"} flex justify-between items-center px-10 w-full h-40`}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold uppercase">
            {instructor.username}&apos;s Page
          </h1>
          <p>
            {instructor.username} has specialization in{" "}
            {instructor.specialization}{" "}
            {instructor.experience_years != 0 &&
              `and has experience of ${instructor.experience_years} years`}
          </p>
        </div>
        <div
          className={`rounded-full p-5 ${toggleTheme ? "bg-slate-100" : "bg-slate-800"} `}
        >
          <GiTeacher size={80} />
        </div>
      </header>
      <div className={`w-full ${toggleTheme ? "bg-slate-200":"bg-slate-600"}  rounded-md flex justify-around py-2`}>
        <button
          onClick={() => setselected("Courses")}
          className={`font-bold text-xl h-full ${selected == "Courses" ? toggleTheme ? "bg-slate-300": "bg-slate-900" : toggleTheme ? "bg-slate-100" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Courses
        </button>
        <button
          onClick={() => setselected("Documents")}
          className={`font-bold text-xl h-full ${selected == "Documents" ? toggleTheme ? "bg-slate-400": "bg-slate-900" : toggleTheme ? "bg-slate-100" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Documents
        </button>
        <button
          onClick={() => setselected("Videos")}
          className={`font-bold text-xl h-full ${selected == "Videos" ? toggleTheme ? "bg-slate-400": "bg-slate-900" : toggleTheme ? "bg-slate-100" : "bg-slate-600"} cursor-pointer rounded-md px-2 py-1`}
        >
          Uploaded Videos
        </button>
      </div>
      {selected == "Courses" ? (
        <>
          {instructor.courses?.length == 0 && (
            <div className="font-bold text-5xl text-center w-full mt-10">
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
      ) : selected == "Documents" ? (
        <div className="flex flex-wrap gap-6">
          {instructor.docs?.length == 0 && (
            <div className="text-5xl font-bold text-center w-full mt-10">
              No Documents found.
            </div>
          )}
          {instructor.docs?.map((doc) => {
            return (
              <AdminDocCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                fileType={doc.fileType}
                fileUrl={doc.fileUrl}
                course={doc.course}
                instructor={instructor.username}
                getter={instructor}
                setter={setinstructor}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {instructor.videos?.length == 0 && (
            <div className="text-5xl font-bold text-center w-full mt-10">
              No Videos Found
            </div>
          )}
          {instructor.videos?.map((video) => {
            return (
              <AdminVideoCard
                key={video.id}
                id={video.id}
                course_name={video.course}
                instructor={instructor.username}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                videoUrl={video.videoUrl}
                created_at={video.created_at}
                getter={instructor}
                setter={setinstructor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
