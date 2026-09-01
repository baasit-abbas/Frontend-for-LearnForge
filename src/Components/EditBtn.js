"use client";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { DialogTrigger } from "./ui/dialog";
import { FaEdit } from "react-icons/fa";

const EditBtn = (props) => {
  return (
    <DialogTrigger
      render={
        <Tooltip>
          <TooltipTrigger onClick={() => props.setopen(true)}><FaEdit className="cursor-pointer" size={20} /></TooltipTrigger>
          <TooltipContent>
            <p className="px-3 py-2 text-gray-100 bg-slate-700 rounded-md font-bold">
              Edit
            </p>
          </TooltipContent>
        </Tooltip>
      }
      className="px-2 py-1 rounded-full bg-slate-600 hover:bg-slate-500 transition-all duration-300 cursor-pointer text-gray-100 outline-none border-none"
    >
      
    </DialogTrigger>
  );
};

export default EditBtn;
