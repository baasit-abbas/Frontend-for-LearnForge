"use client";
import React, { useContext, useEffect, useState } from "react";
import api from "@/utils/authClient";
import { toast } from "@/Components/ui/toast";
import AdminPageHeader from "@/Components/AdminPageHeader";
import StudentCard from "@/Components/StudentCard";
import { WrapperContext } from "@/Components/Wrapper";

const Page = () => {
  const [students, setstudents] = useState([]);
  const [text, settext] = useState("");
  const { toggleTheme } = useContext(WrapperContext);

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
    const lower_text = text.toLocaleLowerCase()
    return students.filter(
      (std) =>
        String(std.id).startsWith(lower_text) ||
        std.username.toLowerCase().startsWith(lower_text) ||
        std.email.startsWith(lower_text),
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col gap-3 md:px-15 px-2 ${toggleTheme ? "bg-slate-100 text-slate-800" : "bg-slate-700 text-slate-100"}`}
    >
      <AdminPageHeader
        search={settext}
        heading="Students"
        placeholder="Search by ID , username or email"
      />
      {handleSearch().length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="md:text-5xl text-2xl font-bold">No Students Found</h1>
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
