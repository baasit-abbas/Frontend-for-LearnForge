"use client";
import StudentSidebar from "@/Components/StudentSideBar";
import { useSidebar } from "@/Components/ui/sidebar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

const Layout = ({children}) => {
  const [student, setstudent] = useState();
  const { open, toggleSidebar } = useSidebar();
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
      <StudentSidebar student={student} />
      <main className="relative">
        <div
          onClick={toggleSidebar}
          className={`p-1 hover:bg-slate-600 text-gray-100 transition-all duration-300 absolute ${open ? "-left-9" : "left-0 rotate-180"} cursor-pointer z-50`}
        >
          <VscLayoutSidebarLeftDock size={25} />
        </div>
      </main>
      <div className="flex-1">{children}</div>
    </>
  );
};

export default Layout;
