"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import InstructorCard from "@/Components/InstructorCard";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [instructors, setinstructors] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get("app/instructors");
      setinstructors(data.data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return instructors;
    }
    return instructors.filter(
      (inst) =>
        String(inst.id).startsWith(text) ||
        inst.username.toLowerCase().startsWith(text) ||
        inst.email.startsWith(text) ||
        inst.specialization.startsWith(text) ||
        String(inst.experience_years).startsWith(text),
    );
  };

  return (
    <div className="px-10 py-8 flex flex-col gap-5 min-h-screen">
      <AdminPageHeader
        heading="Instrcutors"
        search={settext}
        placeholder="Search by ID , username or email , experiece , specialization"
      />
      {handleSearch().length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">No Instructor Found</h1>
        </div>
      )}
      <div className="flex flex-wrap justify-between gap-5">
        {handleSearch().map((inst) => {
          return (
            <InstructorCard
              key={inst.id}
              id={inst.id}
              username={inst.username}
              email={inst.email}
              last_login={inst.last_login}
              specialization={inst.specialization}
              experience_years={inst.experience_years}
              phone={inst.phone}
              getter={instructors}
              setter={setinstructors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
