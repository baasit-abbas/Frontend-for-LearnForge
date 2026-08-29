"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import DisoverCourse from "@/Components/DisoverCourse";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
const Page = () => {
  const [courses, setcourses] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const all_courses = await api.get("app/discover");
      setcourses(all_courses.data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return courses;
    }
    const lower_text = text.toLowerCase();
    return courses.filter((course) =>
      course.title.toLowerCase().startsWith(lower_text),
    );
  };

  return (
    <div className="px-15">
      <AdminPageHeader
        heading="Discover Courses"
        search={settext}
        placeholder="Enter Course you want to enroll"
      />
      {handleSearch().length == 0 && (
        <div className="text-5xl font-bold text-center mt-25">
          No Courses Found
        </div>
      )}
      <div className="mt-10 flex flex-wrap items-center gap-10">
        {handleSearch().map((course) => {
          return (
            <DisoverCourse
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              courses={courses}
              setcourses={setcourses}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
