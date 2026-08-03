"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

const Page = () => {
  const [users, setusers] = useState([]);
  const [filter_users, setfilter_users] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const users = await api.get("app/user");
      setusers(users.data);
      setfilter_users(users.data)
    };
    fetchData();
  }, []);

  

  return (
    <div className="bg-slate-700 text-gray-100 px-15"> 
    <AdminPageHeader getall={users} setfilter={setfilter_users}/>
      <div className="w-full h-full text-gray-100 py-10 ">
        <table className="w-full h-full">
          <thead className="bg-slate-800 text-center h-10 sticky top-0" >
            <tr>
              <td>ID</td>
              <td>Username</td>
              <td>Email</td>
              <td>Role</td>
              <td>Last Login</td>
              <td>Is Active</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {filter_users.map((user) => {
              return (
                <tr key={user.id} className="h-12 border-b-2 border-gray-100">
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.last_login} days ago</td>
                  <td>{user.is_active}</td>
                  <td>
                    <div className="flex gap-3 items-center justify-center">
                      <button className="px-2 py-1 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 cursor-pointer">
                        Edit
                      </button>
                      <button className="px-2 py-1 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-300 cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
                    
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
