"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/authClient";
import { toast } from "@/Components/ui/toast";
import AdminPageHeader from "@/Components/AdminPageHeader";
import StudentCard from "@/Components/StudentCard";

const Page = () => {
  const [students, setstudents] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const all_students = await api.get("app/student");
      setstudents(all_students.data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return students;
    }
    return students.filter(
      (std) =>
        String(std.id).startsWith(text) ||
        std.username.startsWith(text) ||
        std.email.startsWith(text),
    );
  };

  return (
    <div className="flex flex-col gap-3 px-15">
      <AdminPageHeader search={settext} heading="Students" />
      {handleSearch().length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">No Students Found</h1>
        </div>
      )}
      <div className="w-full flex flex-wrap justify-between gap-3">
        {handleSearch().map((std) => {
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
              getter={students}
              setter={setstudents}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
