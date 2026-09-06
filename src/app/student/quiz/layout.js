"use client";
import QuizProvider from "@/Components/QuizProvider";
import QuizSidebar from "@/Components/QuizSidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <QuizProvider>
      <QuizSidebar />
      <div className="flex-1">{children}</div>
    </QuizProvider>
  );
};

export default Layout;
