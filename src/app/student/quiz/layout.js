"use client";
import QuizProvider from "@/Components/QuizProvider";
import QuizSidebar from "@/Components/QuizSidebar";
import { WrapperContext } from "@/Components/Wrapper";
import React, { useContext } from "react";

const Layout = ({ children }) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <QuizProvider>
      <QuizSidebar />
      <div className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"} flex-1`}>{children}</div>
    </QuizProvider>
  );
};

export default Layout;
