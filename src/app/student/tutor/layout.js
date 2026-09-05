"use client";
import TutorProvider from "@/Components/TutorProvider";
import TutorSidebar from "@/Components/TutorSidebar";
import React from "react";
const Layout = ({ children }) => {

  return (
    <TutorProvider>
      <div>
        <TutorSidebar/>
        <div className="flex-1">{children}</div>
      </div>
    </TutorProvider>
  );
};

export default Layout;
