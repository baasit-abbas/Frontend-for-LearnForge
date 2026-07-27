"use client";
import UserCard from "@/Components/UserCard";
import api from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await api.get("app/user");
        setusers(users.data);
      } catch (error) {
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-linear-to-br from-purple-700 to-blue-700 min-h-screen text-gray-100 p-20 flex flex-wrap gap-10">
      {users.map((user) => {
        return (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            email={user.email}
            role={user.role}
          />
        );
      })}
    </div>
  );
};

export default Page;
