"use client";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/Components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import api from "@/utils/authClient";
import { SiGreatlearning } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";
import { FaBook } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"
import { IoMdHome } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import BarItem from "./BarItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logout } from "@/utils/serviceClient";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import { MdQuiz } from "react-icons/md";

const StudentSidebar = (props) => {
  const [selected, setselected] = useState("");
  const [settings, setsettings] = useState();
  const router = useRouter()
  useEffect(() => {
    const loadData = async () => {
      setselected("Home");
      const data = await api.get("settings");
      setsettings(data.data);
    };
    loadData();
  }, []);

  const handleLogOut = () => {
    logout()
    router.push('/login')
  }

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
            <h1 className="font-bold text-lg">{props.student?.username}</h1>
            <p className="text-sm">Student</p>
          </div>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup />
        <BarItem
          name="Home"
          icon={<IoMdHome size={30} />}
          href="/student"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Discover Courses"
          icon={<FaSearch size={30} />}
          href="/student/discover"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Your Courses"
          icon={<FaBook size={30} />}
          href="/student/courses"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Generate Quiz"
          icon={<MdQuiz size={30} />}
          href="/student/quiz"
          selected={selected}
          setselected={setselected}
        />
        <BarItem
          name="Ask AI"
          icon={<FaRobot size={30} />}
          href="/student/ai"
          selected={selected}
          setselected={setselected}
        />
        <SidebarGroup />
      </SidebarContent>
      <Popover>
        <PopoverTrigger className={`p-3 rounded-md hover:bg-slate-600 transition-all duration-300 cursor-pointer flex items-center gap-4`}>
          <IoSettings size={30}/>
          <h1 className="text-xl">Settings</h1>
        </PopoverTrigger>
        <PopoverContent className='bg-slate-800 text-gray-100 rounded-md'>
          <PopoverHeader>
            <PopoverTitle></PopoverTitle>
            <PopoverDescription></PopoverDescription>
          </PopoverHeader>
          <button onClick={handleLogOut} className="transition-all duration-300 cursor-pointer hover:bg-slate-600 p-2 rounded-md flex items-center  gap-4 text-lg outline-none">
            <RiLogoutBoxRLine size={25}/>
            <p>Log Out</p>
          </button>
          <ChangePassword />
        </PopoverContent>
      </Popover>
      <SidebarFooter />
    </Sidebar>
  );
};

export default StudentSidebar;
