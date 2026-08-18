"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Spinner } from "./ui/spinner";

const DeleteVideo = (props) => {
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    try {
      await api.delete(`app/videos/${props.id}`);
      let new_videos = [];
      if (props.getter.videos) {
        new_videos = { ...props.getter };
        new_videos.videos = new_videos.videos.filter(
          (video) => video.id != props.id,
        );
      } else {
        new_videos = props.getter.filter((video) => video.id != props.id);
      }
      props.setter(new_videos);
      toast.add({ title: "Deleted Video Succssfully" });
      setopen(false);
    } catch (error) {
      console.log(error.response.data);
      for (const field in error.response.data) {
        console.log(error);
        toast.add({ title: `${field} : ${error.response.data[field]}` });
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger className="p-2 rounded-full bg-slate-700 cursor-pointer hover:bg-slate-600 transition-all duration-300">
            <MdDelete size={20} />
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800 text-gray-100 py-2 font-bold">
            Delete Video
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            video.
          </DialogDescription>
        </DialogHeader>
        <button
        disabled={loading}
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-500 transition-all duration-300 w-full py-2 text-lg select-none rounded-xl cursor-pointer flex items-center justify-center"
        >
          {loading ? <Spinner className="h-5 w-5" /> : "Delete Video"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVideo;
