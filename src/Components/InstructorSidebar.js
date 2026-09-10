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
} from "@/Components/ui/popover";

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
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logout } from "@/utils/serviceClient";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import { WrapperContext } from "./Wrapper";

const InstructorSidebar = (props) => {
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
    <Sidebar className={`py-5 px-2 ${toggleTheme ? "bg-slate-200 text-slate-900" : "bg-slate-900 text-white"}`}>
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
          href="/instructor/courses"
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
          href="/instructor/videos"
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

export default InstructorSidebar;
