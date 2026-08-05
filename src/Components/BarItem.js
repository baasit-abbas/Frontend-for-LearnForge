"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const BarItem = (props) => {
    const router = useRouter()
  return (
    <Link href={props.href} className="p-3 flex gap-4 items-center hover:cursor-pointer hover:bg-slate-500 transition-all duration-300 rounded-md outline-none">
      {props.icon}
      <p className="text-xl outline-none">{props.name}</p>
    </Link>
  );
};

export default BarItem;
