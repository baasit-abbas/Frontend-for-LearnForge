"use client";
import StudentSidebar from "@/Components/StudentSideBar";
import { useSidebar } from "@/Components/ui/sidebar";
import { WrapperContext } from "@/Components/Wrapper";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

const Layout = ({ children }) => {
  const [student, setstudent] = useState();
  const { open, toggleSidebar , isMobile , openMobile , setopenMobile } = useSidebar();
  const { toggleTheme } = useContext(WrapperContext);
  const router = useRouter();
  useEffect(() => {
    const loadUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role != "Student") {
        router.push("/login");
      }
      setstudent(user);
    };
    loadUser();
  }, []);

  return (
    <>
      <div
        className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"}`}
      >
        <StudentSidebar student={student} />
        {isMobile ? (
          <main>
            <div
              onClick={toggleSidebar}
              className={`cursor-pointer ${toggleTheme ? "hover:bg-slate-200" : "hover:bg-slate-500"}  transition-all duration-300  p-1 fixed ${openMobile ? "left-71" : "left-0"} z-70`}
            >
              <VscLayoutSidebarLeftDock
                className={`transition-all duration-300 ${openMobile ? "" : "rotate-180"}`}
                size={25}
              />
            </div>
          </main>
        ) : (
          <main>
            <div
              onClick={toggleSidebar}
              className={`cursor-pointer ${toggleTheme ? "hover:bg-slate-200" : "hover:bg-slate-500"}  transition-all duration-300  p-1 fixed ${open ? "left-55" : "left-0"} z-70`}
            >
              <VscLayoutSidebarLeftDock
                className={`transition-all duration-300 ${open ? "" : "rotate-180"}`}
                size={25}
              />
            </div>
          </main>
        )}
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
