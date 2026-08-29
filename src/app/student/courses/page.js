"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import StudentCourseCard from "@/Components/StudentCourseCard";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setcourses] = useState([]);
  const [text, settext] = useState("");
  useEffect(() => {
    const loadData = async () => {
      const all_courses = await api.get("app/course");
      setcourses(all_courses.data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return courses;
    }
    const lower_text = text.toLowerCase();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().startsWith(lower_text) ||
        course.description.toLowerCase().startsWith(lower_text),
    );
  };

  return (
    <div className="px-10 py-5">
      <AdminPageHeader
        heading="Enrolled Courses"
        search={settext}
        placeholder="Search by title or description"
      />
      <div className="mt-10">
        {handleSearch().length == 0 && (
          <div className="text-5xl font-bold pt-10 text-center">
            No Courses Found
          </div>
        )}
        <div className="flex flex-wrap gap-10">
        {handleSearch().map((course) => {
          return (
            <StudentCourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              progress={course.progress}
              href="student"
            />
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Page;
