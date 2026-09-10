"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { FaRegPlayCircle } from "react-icons/fa";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import api from "@/utils/authClient";

const PlayVideo = (props) => {
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
    <Dialog open={props.open} onOpenChange={props.setopen}>
      <DialogTrigger
        
      ></DialogTrigger>
      <DialogContent className="md:w-250 md:h-150 w-100 h-100 bg-slate-800 text-white">
        <DialogHeader className='w-full h-full'>
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
