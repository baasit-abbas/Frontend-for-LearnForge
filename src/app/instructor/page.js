"use client";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [instrcutor, setinstrcutor] = useState();
  useEffect(() => {
    const loadData = async () => {
      const user = JSON.parse(localStorage.getItem("user"))
      const all_data = await api.get(`app/instructor`);
      setinstrcutor(all_data.data)
    };
    loadData()
  }, []);

  return (
    <div className="bg-slate-800">

    </div>
  )
};

export default Page;
