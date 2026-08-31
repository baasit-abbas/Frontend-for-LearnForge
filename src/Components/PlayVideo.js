"use client";
import React, { useRef, useState } from "react";
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
import api from "@/utils/authClient";

const PlayVideo = (props) => {
  const [open, setopen] = useState(false);
  const videoRef = useRef();
  const handleDurationChange = async () => {
    const total_duration = videoRef.current?.duration;
    const current_duration = videoRef.current?.currentTime;
    let percent = 100;
    if (total_duration != 0) {
      percent = (current_duration / total_duration) * 100;
    }
    console.log(percent)
    if (percent < 90) {
      return;
    }
    try {
      await api.patch(`app/videos/progress/${props.id}`, { duration: percent });
      const old_courses = { ...props.getter };
      const idx = old_courses.videos.videos.findIndex(
        (video) => video.id == props.id,
      );
      old_courses.videos.videos[idx].completed = true;
      old_courses.review.review.completed += 1;
      props.setter(old_courses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger
        render={
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                (props.stop(), setopen(true));
              }}
              className="bg-slate-700 p-1 rounded-full text-gray-100 absolute bottom-0 right-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bottom-4 hover:bg-slate-800 transition-all duration-300"
            >
              <FaRegPlayCircle size={30} />
            </TooltipTrigger>
            <TooltipContent className="p-2 rounded-xl text-gray-100 bg-slate-800 font-bold">
              Play Video
            </TooltipContent>
          </Tooltip>
        }
      ></DialogTrigger>
      <DialogContent className="w-250 h-150 bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="w-full h-full">
            <video
              ref={videoRef}
              onTimeUpdate={handleDurationChange}
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
