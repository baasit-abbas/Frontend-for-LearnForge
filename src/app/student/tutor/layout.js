"use client";
import TutorProvider from "@/Components/TutorProvider";
import TutorSidebar from "@/Components/TutorSidebar";
import { WrapperContext } from "@/Components/Wrapper";
import React, { useContext } from "react";
const Layout = ({ children }) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <TutorProvider>
      <div className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"}`}>
        <TutorSidebar/>
        <div className="flex-1">{children}</div>
      </div>
    </TutorProvider>
  );
};

export default Layout;
