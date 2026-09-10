"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { WrapperContext } from "./Wrapper";

const StudentSidebar = (props) => {
  const [selected, setselected] = useState("");
  const [settings, setsettings] = useState();
  const {toggleTheme} = useContext(WrapperContext)
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
    <Sidebar className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"} px-5 py-2`} >
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
        <div className={`flex gap-3 rounded-lg px-2 py-1 ${toggleTheme ? "bg-slate-300 text-slate-900" : "bg-slate-900 text-gray-100 "} items-center`}>
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
          href="/student/tutor"
          selected={selected}
          setselected={setselected}
        />
        <SidebarGroup />
      </SidebarContent>
      <Popover>
        <PopoverTrigger className={`p-3 flex gap-4 items-center hover:cursor-pointer  ${ toggleTheme ? "hover:bg-slate-300": 'hover:bg-slate-500'} transition-all duration-300 rounded-md outline-none`}>
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
