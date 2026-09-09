"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { Toaster } from "./ui/toast";
import { TooltipProvider } from "./ui/tooltip";

export const WrapperContext = createContext();
const Wrapper = ({ children }) => {
  const [toggleTheme, settoggleTheme] = useState(false);
  useEffect(() => {
    const loadData = () => {
      const theme = localStorage.getItem("theme");
      let toggle = false;
      if (theme == "light") {
        toggle = true;
      }
      settoggleTheme(toggle);
    };
    loadData();
  }, []);

  const handleToggle = () => {
    let toggle = !toggleTheme;
    settoggleTheme(!toggleTheme);
    let theme = "dark";
    if (toggle == true) {
      theme = "light";
    }
    localStorage.setItem("theme", theme);
  };
  return (
    <WrapperContext.Provider value={{ toggleTheme, settoggleTheme }}>
      <SidebarProvider>
        <div
          onClick={handleToggle}
          className="p-2 rounded-full bg-slate-500 hover:bg-slate-400 transition-all duration-300 cursor-pointer fixed top-4 right-4"
        >
          {toggleTheme ? (
            <MdNightlight className="text-gray-100" size={20} />
          ) : (
            <MdOutlineWbSunny className="text-gray-100" size={20} />
          )}
        </div>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </SidebarProvider>
    </WrapperContext.Provider>
  );
};

export default Wrapper;
