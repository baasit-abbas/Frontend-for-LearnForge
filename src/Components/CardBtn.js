"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import Link from "next/link";

const CardBtn = (props) => {
  return (
    <Tooltip>
      {props.href ? (
        <Link href={props.href}>
          <TooltipTrigger className="p-2 bg-slate-800 text-gray-100 cursor-pointer hover:bg-slate-700">
            {props.icon}
          </TooltipTrigger>
        </Link>
      ) : (
        <TooltipTrigger className="p-2 bg-slate-800 text-gray-100 cursor-pointer hover:bg-slate-700">
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
