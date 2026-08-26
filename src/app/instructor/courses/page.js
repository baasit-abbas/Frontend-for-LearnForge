"use client";
import AdminCourseCard from "@/Components/AdminCourseCard";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [text, settext] = useState("");
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("app/course");
      setcourses(response.data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return courses;
    }
    const lower_text = text.toLowerCase();
    return courses.filter((course) => course.title.toLowerCase().startsWith(lower_text));
  };

  return (
    <div className="min-h-screen bg-slate-700 px-10 py-5">
      <AdminPageHeader
        heading="Courses"
        search={settext}
        placeholder="Search by title."
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
              href="instructor"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
