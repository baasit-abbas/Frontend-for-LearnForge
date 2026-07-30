import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/Components/ui/sidebar";

import { SiGreatlearning } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";

export function AdminSidebar(props) {
  console.log(props);
  return (
    <Sidebar className="p-2 flex flex-col gap-5 text-gray-100">
      <SidebarHeader />
      <div className="flex gap-4 items-center">
        <SiGreatlearning className="text-gray-100" size={30} />
        <h1 className="text-3xl text-gray-100 font-bold">LearnForge</h1>
      </div>

      <div className="flex gap-3 rounded-lg px-2 py-1 bg-slate-900 items-center">
        <div className=" rounded-full bg-gray-100">
          <FcBusinessman className="" size={40} />
        </div>

        <div className="flex flex-col">
          <h1>{props.admin.username}</h1>
          <p className="text-sm text-gray-200">Admin</p>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
