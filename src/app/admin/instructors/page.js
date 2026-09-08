"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import InstructorCard from "@/Components/InstructorCard";
import { WrapperContext } from "@/Components/Wrapper";
import api from "@/utils/authClient";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [instructors, setinstructors] = useState([]);
  const [text, settext] = useState("");
  const  {toggleTheme} = useContext(WrapperContext)

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
    const lower_text = text.toLocaleLowerCase()
    return instructors.filter(
      (inst) =>
        String(inst.id).startsWith(lower_text) ||
        inst.username.toLowerCase().startsWith(lower_text) ||
        inst.email.startsWith(lower_text) ||
        inst.specialization.startsWith(lower_text) ||
        String(inst.experience_years).startsWith(lower_text),
    );
  };

  return (
    <div className={`${toggleTheme ? "bg-slate-100 text-slate-800":"bg-slate-700 text-slate-100"} px-10 py-8 flex flex-col gap-5 min-h-screen`}>
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
