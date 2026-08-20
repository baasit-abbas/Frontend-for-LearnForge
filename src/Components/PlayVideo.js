"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegPlayCircle } from "react-icons/fa";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const PlayVideo = (props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger
            onClick={props.stop}
            className="bg-slate-700 p-1 rounded-full text-gray-100 absolute bottom-0 right-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bottom-4 hover:bg-slate-800 transition-all duration-300 "
          >
            <FaRegPlayCircle size={30} />
          </TooltipTrigger>
          <TooltipContent className="p-2 rounded-xl text-gray-100 bg-slate-800 font-bold">
            Play Video
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="w-250 h-150 bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="w-full h-full">
            <video
              className="w-full h-full border-none outline-none"
              src={props.src}
              autoPlay
              controls
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayVideo;
