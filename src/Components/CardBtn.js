"use client";
import React, { useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import Link from "next/link";
import { WrapperContext } from "./Wrapper";

const CardBtn = (props) => {
  const { toggleTheme } = useContext(WrapperContext);
  return (
    <Tooltip>
      {props.href ? (
        <Link href={props.href}>
          <TooltipTrigger
            className={`p-2 w-full ${toggleTheme ? "bg-slate-200 text-gray-700 hover:bg-slate-100" : "bg-slate-800 hover:bg-slate-700 text-gray-100"}  cursor-pointer `}
          >
            {props.icon}
          </TooltipTrigger>
        </Link>
      ) : (
        <TooltipTrigger
          onClick={() => props.setopen(true)}
          className={`p-2 ${toggleTheme ? "bg-slate-200 hover:bg-slate-100 text-gray-700" : "bg-slate-800 hover:bg-slate-700 text-gray-100"} cursor-pointer `}
        >
          {props.icon}
        </TooltipTrigger>
      )}

      <TooltipContent>
        <p className="font-bold bg-slate-600 text-gray-100 p-2 rounded-lg">
          {props.text}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CardBtn;
