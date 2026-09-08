"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { WrapperContext } from "./Wrapper";

const BarItem = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <Link
    onClick={() => {props.setselected && props.setselected(props.name)}}
      
      href={props.href}
      className={`p-3 flex gap-4 items-center hover:cursor-pointer  ${props.selected == props.name ? toggleTheme ? "bg-slate-300": 'bg-slate-800' : toggleTheme ? "hover:bg-gray-200" : 'hover:bg-slate-500'} transition-all duration-300 rounded-md outline-none`}
    >
      {props.icon}
      <p className="text-xl outline-none">{props.name}</p>
    </Link>
  );
};

export default BarItem;
