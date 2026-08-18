"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserTable from "@/Components/UserTable";
import { toast } from "@/Components/ui/toast";

const Page = () => {
  const [users, setusers] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const all_users = await api.get("app/user");
      setusers(all_users.data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (text == "") {
      return users;
    }
    const search_users = users.filter(
      (user) =>
        String(user.id).startsWith(text) ||
        user.username.toLowerCase().startsWith(text) ||
        user.email.startsWith(text),
    );

    return search_users;
  };

  const handleEdit = async (id, new_data) => {
    try {
      await api.patch(`app/user/${id}`, new_data);
      let new_users = [...users];
      const idx = new_users.findIndex((user) => user.id == id);
      new_users[idx] = { ...new_users[idx], ...new_data };
      setusers(new_users);
      toast.add({ title: "Updated User's data Successfully" });
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title: error.response.data[field] });
      }
    }
  };

  const handleDelete = (id) => {
    try {
      api.delete(`app/user/${id}`);
      const new_users = users.filter((user) => user.id !== id);
      setusers(new_users);
      toast.add({ title: "User Deleted Successfully" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="bg-slate-700 text-gray-100 px-15">
      <AdminPageHeader
        search={setText}
        heading="Users"
        placeholder="Search by ID , username or email"
      />
      {handleSearch().length == 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">No Users Found</h1>
        </div>
      ) : (
        <div className="w-full max-h-135 text-gray-100 mt-7">
          <ScrollArea className="max-h-full w-full border-none outline-none rounded-lg">
            <UserTable
              users={handleSearch}
              edit={handleEdit}
              delete={handleDelete}
            />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Page;
