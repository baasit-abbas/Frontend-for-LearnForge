"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setcourses] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const all_data = await api.get("app/course");
      setcourses(all_data.data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return courses;
    }
    return courses.filter((course) => course.title.startsWith(text));
  };

  return (
    <div className="px-15 bg-slate-800 h-full w-full">
      <AdminPageHeader
        search={settext}
        heading="Courses"
        placeholder="Search by title"
      />
      {handleSearch().length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">No Course Found</h1>
        </div>
      )}
      <div className="flex flex-wrap gap-10">
        {handleSearch().map((course) => {
          return (
            <AdminCourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              progress={course.average_progress}
              setter={setcourses}
              getter={courses}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
