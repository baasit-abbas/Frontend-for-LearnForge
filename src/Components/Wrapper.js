"use client";
import React, { useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { Toaster } from "./ui/toast";
import { TooltipProvider } from './ui/tooltip';

const Wrapper = ({ children }) => {
  // const theme = localStorage.getItem("theme");
  // let toggle = false;
  // if (theme == "light") {
  //   toggle = true;
  // }
  const [toggleTheme, settoggleTheme] = useState(false);

  const handleToggle = () => {
    settoggleTheme(!toggleTheme);
    // let theme = "dark";
    // if (toggle == true) {
    //   theme = "light";
    // }
    // localStorage.setItem("theme", false);
  };
  return (
    <div
      className={`${toggleTheme ? "bg-gray-100 text-slate-900" : "bg-slate-700 text-gray-100"}`}
    >
      <SidebarProvider>
        {/* <div
          onClick={handleToggle}
          className="p-2 rounded-full bg-slate-500 hover:bg-slate-400 transition-all duration-300 cursor-pointer fixed top-7 right-4"
        >
          {toggleTheme ? (
            <MdNightlight className="text-gray-100" size={20} />
          ) : (
            <MdOutlineWbSunny className="text-gray-100" size={20} />
          )}
        </div> */}
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </SidebarProvider>
    </div>
  );
};

export default Wrapper;
