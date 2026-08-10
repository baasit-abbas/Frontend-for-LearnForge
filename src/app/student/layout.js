"use client";
import { AdminSidebar } from "@/Components/AdminSidebar";
import { useSidebar } from "@/Components/ui/sidebar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

const Layout = ({ children }) => {
  const [user, setuser] = useState();
  const router = useRouter();
  const {toggleSidebar , open} = useSidebar()
  useEffect(() => {
    const fetchUser = () => {
      const profile = JSON.parse(localStorage.getItem("user"));
      if (!profile || profile.role == "Instructor") {
        router.push("/login");
        return;
      }
      setuser(profile);
    };
    fetchUser();
  }, []);

  return (
    <>
      {user?.role == "Admin" ? <AdminSidebar admin={user} /> : ""}
      <main>
        <div
          onClick={toggleSidebar}
          className={`cursor-pointer hover:bg-slate-500 transition-all duration-300  p-1 fixed ${open ? "left-55" : "left-0"} z-10`}
        >
          <VscLayoutSidebarLeftDock
            className={`transition-all duration-300 ${open ? "" : "rotate-180"}`}
            size={25}
          />
        </div>
      </main>
      <div className="flex-1">{children}</div>
    </>
  );
};

export default Layout;
