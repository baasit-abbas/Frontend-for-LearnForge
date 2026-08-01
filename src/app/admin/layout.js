"use client";
import { AdminSidebar } from "@/Components/AdminSidebar";
import { useSidebar } from "@/Components/ui/sidebar";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

const Layout = ({ children }) => {
  const [admin, setadmin] = useState("");
  const { toggleSidebar , open } = useSidebar();
  useEffect(() => {
    const loadAdminData = async () => {
      const adminProfile = await api.get("app/getProfile");
      setadmin(adminProfile.data);
    };
    loadAdminData();
  }, []);

  return (
    <>
      <AdminSidebar admin={admin} />
      <main>
        <div
          onClick={toggleSidebar}
          className={`cursor-pointer hover:bg-slate-500 transition-all duration-300  p-1 fixed ${open ? 'left-55':'left-0'} z-10`}
        >
          <VscLayoutSidebarLeftDock className={`transition-all duration-300 ${open ? '' : 'rotate-180'}`} size={25} />
        </div>
      </main>
      <div className="flex-1">{children}</div>
    </>
  );
};

export default Layout;
