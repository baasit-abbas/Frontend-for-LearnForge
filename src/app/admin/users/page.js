"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserTable from "@/Components/UserTable";

const Page = () => {
  const [users, setusers] = useState([]);
  const [filter_users, setfilter_users] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await api.get("app/user");
      setusers(users.data);
      setfilter_users(users.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-700 text-gray-100 px-15">
      <AdminPageHeader getall={users} setfilter={setfilter_users} />
      <div className="w-full h-135 text-gray-100 mt-7 rounded-xl border-2 border-gray-100">
        <ScrollArea className="h-full w-full border-none outline-none rounded-lg">
          <UserTable users={filter_users} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
