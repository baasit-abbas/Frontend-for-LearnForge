"use client";
import Link from "next/link";
import React from "react";

const BarItem = (props) => {
  return (
    <Link
      onClick={() => props.setselected(props.name)}
      href={props.href}
      className={`p-3 flex gap-4 items-center hover:cursor-pointer hover:bg-slate-500 ${props.selected == props.name ? 'bg-slate-800' : ''} transition-all duration-300 rounded-md outline-none`}
    >
      {props.icon}
      <p className="text-xl outline-none">{props.name}</p>
    </Link>
  );
};

export default BarItem;
