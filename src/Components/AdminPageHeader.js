"use client";
import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";

const AdminPageHeader = (props) => {
  const handleSearch = (e) => {
    const text = e.target.value;
    props.search(text)
  };
  return (
    <header className="flex justify-between py-5 items-center">
      <div className="flex gap-5 items-center">
        <FaUser size={20} />
        <h1 className="text-2xl ">All Users</h1>
      </div>
      <div className="w-85 h-15 relative">
        <input
          onChange={handleSearch}
          className="w-full h-full pl-10 py-2 pr-2 bg-gray-100 text-slate-800 border-4 border-gray-600 outline-none placeholder:text-slate-400 placeholder:text-sm focus:border-gray-700 text-lg  rounded-full"
          type="text"
          placeholder="Search by Name, Email or ID"
        />
        <FaSearch
          className="text-slate-700 absolute top-1/2 translate-y-[-50%] left-3"
          size={20}
        />
      </div>
    </header>
  );
};

export default AdminPageHeader;
