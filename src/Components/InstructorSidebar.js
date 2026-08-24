"use client";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/Components/ui/sidebar";
import api from "@/utils/authClient";
import { SiGreatlearning } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";
import { PiStudentBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiVideoFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import BarItem from "./BarItem";

const InstructorSidebar = (props) => {
  const [selected, setselected] = useState("Home");
  const [settings, setsettings] = useState();
  useEffect(() => {
    const loadData = async () => {
      const data = await api.get("settings");
      setsettings(data.data);
    };
    loadData();
  }, []);

  return (
    <Sidebar className="py-5 px-2 bg-slate-700 text-gray-100">
      <SidebarHeader />
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          {settings?.logo ? (
            <img src={`http://localhost:8000/${settings.logo}`} alt="" />
          ) : (
            <SiGreatlearning size={45} />
          )}
          <h1 className="text-3xl font-bold">{settings?.name}</h1>
        </div>
        <div className="rounded-md bg-slate-800 flex gap-3 items-center py-1 px-4">
          <div className="rounded-full bg-slate-100">
            <FcBusinessman size={40} />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-lg">{props.instructor.username}</h1>
            <p className="text-sm">Instructor</p>
          </div>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup />
        <BarItem
          name="Home"
          icon={<IoMdHome size={30} />}
          href="/instructor"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Your Students"
          icon={<PiStudentBold size={30} />}
          href="/instructor/students"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Your Courses"
          icon={<FaBook size={30} />}
          href="/instructo/courses"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Your Documents"
          icon={<SiGoogledocs size={30} />}
          href="/instructor/docs"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Your Videos"
          icon={<RiVideoFill size={30} />}
          href="/instructor"
          selected={selected}
          setselected={setselected}
        />
        <SidebarGroup />
      </SidebarContent>
      <BarItem
          name="Settings"
          icon={<IoSettings size={30} />}
          href="/instructor/settings"
          selected={selected}
          setselected={setselected}
        />
      <SidebarFooter />
    </Sidebar>
  );
};

export default InstructorSidebar;
