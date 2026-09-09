"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "@/Components/ui/sidebar";
import InstructorSidebar from "@/Components/InstructorSidebar";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { WrapperContext } from "@/Components/Wrapper";

const Layout = ({ children }) => {
  const router = useRouter();
  const [instructor, setinstructor] = useState({});
  const { open, toggleSidebar } = useSidebar();
  const { toggleTheme } = useContext(WrapperContext);
  useEffect(() => {
    const loadData = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role != "Instructor") {
          router.push("/login");
        }
        setinstructor(user);
      } catch (error) {
        router.push("/login");
      }
    };
    loadData();
  }, []);

  return (
    <>
      <div
        className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"}`}
      >
        <InstructorSidebar instructor={instructor} />
        <main>
          <div
            onClick={toggleSidebar}
            className={`cursor-pointer ${toggleTheme ? "hover:bg-slate-200" : "hover:bg-slate-500"}  transition-all duration-300  p-1 fixed ${open ? "left-55" : "left-0"} z-10`}
          >
            <VscLayoutSidebarLeftDock
              className={`transition-all duration-300 ${open ? "" : "rotate-180"}`}
              size={25}
            />
          </div>
        </main>
      </div>
      <div
        className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"} flex-1`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
