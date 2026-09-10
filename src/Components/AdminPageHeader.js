"use client";
import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Input } from "./ui/input";

const AdminPageHeader = (props) => {
  const handleSearch = (e) => {
    const text = e.target.value;
    props.search(text)
  };
  return (
    <header className="flex md:flex-row flex-col md:justify-between md:py-5 py-15 md:gap-0 gap-5 items-center">
      <div className="flex gap-5 items-center">
        <FaUser size={20} />
        <h1 className="text-2xl ">All {props.heading}</h1>
      </div>
      <div className="md:w-130 w-90 h-15 relative">
        <Input
          onChange={handleSearch}
          className="w-full h-full pl-10 py-2 pr-2 bg-gray-100 text-slate-800 border-4  text-lg  rounded-full"
          type="text"
          placeholder={props.placeholder}
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
