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
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import BarItem from "./BarItem";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logout } from "@/utils/serviceClient";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import { TutorContext } from "./TutorProvider";
import TutorItem from "./TutorItem";

const TutorSidebar = () => {
  const [isEdit, setisEdit] = useState("");
  const [settings, setsettings] = useState();
  const { chats, setchats, setid, setconversation , selected , setselected } = useContext(TutorContext);
  const router = useRouter();
  useEffect(() => {
    const loadData = async () => {
      const data = await api.get("settings");
      setsettings(data.data);
      const all_chats = await api.get("app/chat");
      setchats(all_chats.data);
    };
    loadData();
  }, []);

  const handleLogOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar className="py-5 px-2 bg-slate-700 text-gray-100">
      <SidebarHeader />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {settings?.logo ? (
            <img src={`http://localhost:8000/${settings.logo}`} alt="" />
          ) : (
            <SiGreatlearning size={45} />
          )}
          <h1 className="text-3xl font-bold">{settings?.name}</h1>
        </div>
        <BarItem name="Home" icon={<IoMdHome size={30} />} href="/student" />
        <div
          onClick={() => {
            (setid(""), setconversation(""), router.push("/student/tutor"));
          setselected("")}}
          className="w-full p-3 flex items-center bg-slate-800 text-gray-100 gap-3 rounded-md cursor-pointer"
        >
          <IoChatbubbleEllipsesOutline size={25} />
          <h1 className="text-lg">New Chat</h1>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup />
        <div className="flex flex-col gap-4">
          {chats?.map((chat) => {
            return (
              <TutorItem
                key={chat.id}
                id={chat.id}
                title={chat.title}
                selected={selected}
                setselected={setselected}
                isEdit={isEdit}
                setisEdit={setisEdit}
              />
            );
          })}
        </div>
        <SidebarGroup />
      </SidebarContent>
      <Popover>
        <PopoverTrigger
          className={`p-3 rounded-md hover:bg-slate-600 transition-all duration-300 cursor-pointer flex items-center gap-4`}
        >
          <IoSettings size={30} />
          <h1 className="text-xl">Settings</h1>
        </PopoverTrigger>
        <PopoverContent className="bg-slate-800 text-gray-100 rounded-md">
          <PopoverHeader>
            <PopoverTitle></PopoverTitle>
            <PopoverDescription></PopoverDescription>
          </PopoverHeader>
          <button
            onClick={handleLogOut}
            className="transition-all duration-300 cursor-pointer hover:bg-slate-600 p-2 rounded-md flex items-center  gap-4 text-lg outline-none"
          >
            <RiLogoutBoxRLine size={25} />
            <p>Log Out</p>
          </button>
          <ChangePassword />
        </PopoverContent>
      </Popover>
      <SidebarFooter />
    </Sidebar>
  );
};

export default TutorSidebar;
