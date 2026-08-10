"use client";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";

const Page = () => {
  const [student, setstudent] = useState([]);
  const [role, setrole] = useState("")
  const params = useParams()
  useEffect(() => {
    const fetchData = async () => {
        const id = params.id
        const all_data = await api.get(`app/student/${id}`);
        setstudent(all_data.data);
        console.log(JSON.parse(localStorage.getItem('user')).role)
        setrole(JSON.parse(localStorage.getItem('user')).role)
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-3">
      <header className="flex items-center justify-between rounded-full w-full bg-slate-700">
        {role == "Admin" ? (
          <>
            <h1 className="text-2xl font-bold">{student.username} Page</h1>
            <PiStudentFill size={30} />
          </>
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
};

export default Page;
