"use client";
import { AdminSidebar } from "@/Components/AdminSidebar";
import { useSidebar } from "@/Components/ui/sidebar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";

const Layout = ({ children }) => {
  const [admin, setadmin] = useState("");
  const { toggleSidebar , open } = useSidebar();
  const router = useRouter()
  useEffect(() => {
    const loadAdminData =  () => {
      const adminProfile = JSON.parse(localStorage.getItem('user'));
      if (adminProfile.role != 'Admin'){
        router.push('/login')
      }
      setadmin(adminProfile);
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
