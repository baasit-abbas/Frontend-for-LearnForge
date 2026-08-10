import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from "@/Components/ui/sidebar";

import { SiGreatlearning } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";
import { FaUsers } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiVideoFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

import BarItem from "./BarItem";

export function AdminSidebar(props) {
  return (
    
    <Sidebar className="p-2 border-r-4 border-slate-900 select-none">
    
      <SidebarHeader />
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-4 items-center">
          <SiGreatlearning size={30} />
          <h1 className="text-3xl  font-bold">LearnForge</h1>
        </div>

        <div className="flex gap-3 rounded-lg px-2 py-1 bg-slate-900 items-center">
          <div className=" rounded-full bg-gray-100">
            <FcBusinessman  size={40} />
          </div>

          <div className="flex flex-col text-gray-200">
            <h1>{props.admin.username}</h1>
            <p className="text-sm text-gray-200">Admin</p>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2 " />
        <BarItem
          href="/admin"
          name="Home"
          icon={<IoMdHome size={30} />}
        />
        <BarItem
          href="/admin/users"
          name="Users"
          icon={<FaUsers size={30} />}
        />
        <BarItem
          href="/admin/students"
          name="Students"
          icon={<PiStudentBold size={30} />}
        />
        <BarItem
          href="/admin/instructors"
          name="Instructors"
          icon={<GiTeacher  size={30} />}
        />
        <BarItem
          href="/admin/courses"
          name="Courses"
          icon={<FaBook  size={30} />}
        />
        <BarItem
          href="/admin/docs"
          name="Documents"
          icon={<SiGoogledocs  size={30} />}
        />
        <BarItem
          href="/admin/videos"
          name="Videos"
          icon={<RiVideoFill  size={30} />}
        />

        <SidebarGroup />
      </SidebarContent>
      <BarItem
          href="/admin/settings"
          name="Settings"
          icon={<IoSettings  size={30} />}
        />
      <SidebarFooter />
    </Sidebar>
  );
}
