"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import InstrctorStudentCard from "@/Components/InstrctorStudentCard";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/Components/ui/progress";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [text, settext] = useState("");
  const [students, setstudents] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("app/student");
      setstudents(response.data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return students;
    }
    const lower_text = text.toLocaleLowerCase();
    return students.filter(
      (std) =>
        std.username.toLowerCase().startsWith(lower_text) ||
        std.email.toLowerCase().startsWith(lower_text),
    );
  };

  return (
    <div className="min-h-screen bg-slate-700 px-10 py-5">
      <AdminPageHeader
        heading="Students"
        placeholder="Search by Student name or email."
        search={settext}
      />
      <div className="w-full flex flex-wrap items-center gap-4 mt-10">
        {handleSearch()?.length == 0 && (
          <div className="flex items-center justify-center text-5xl font-bold text-center w-full">
            No Students Found
          </div>
        )}
        {handleSearch()?.map((student) => {
          return (
            <InstrctorStudentCard
              key={student.id}
              username={student.username}
              email={student.email}
              progress={student.progress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
