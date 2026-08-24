"use client";
import React, { useEffect, useState } from "react";
import { useSidebar } from "@/Components/ui/sidebar";
import InstructorSidebar from "@/Components/InstructorSidebar";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const [instructor, setinstructor] = useState({});
  const { open, toggleSidebar } = useSidebar();
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
      <InstructorSidebar instructor={instructor} />
      <main className="relative">
        <div
          className={`p-1 hover:bg-slate-600 cursor-pointer absolute top-0 ${open ? "left-[-35]" : "left-0"} z-50`}
          onClick={toggleSidebar}
        >
          <VscLayoutSidebarLeftDock
            size={25}
            className={`${open ? "" : "rotate-180"} transition-all duration-300`}
          />
        </div>
      </main>
      <div className="flex-1">{children}</div>
    </>
  );
};

export default Layout;
