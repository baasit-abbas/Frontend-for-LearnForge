"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [instructors, setinstructors] = useState([]);
  const [text, settext] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get("app/instructor");
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
        inst.id.startsWith(text) ||
        inst.username.toLowerCase().startsWith(text) ||
        inst.email.startsWith(text),
    );
  };

  return (
    <div className="px-10 py-15 flex flex-col gap-5">
      <AdminPageHeader
        heading="Instrcutors"
        search={settext}
        placeholder="Search by ID , username or email"
      />
      <div className="flex flex-wrap justify-between">
        {handleSearch.map(inst => {
            return (
                <div key={inst.id}>

                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Page;
