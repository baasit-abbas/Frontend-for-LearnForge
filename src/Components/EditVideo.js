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
import { FaEdit } from "react-icons/fa";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { FileTextIcon, XIcon } from "lucide-react";

const EditVideo = (props) => {
  const [title, settitle] = useState(props.title);
  const [image, setimage] = useState();
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("title",title );
      if (image){
        formData.append("thumbnailUrl", image);
      }
      const new_video = await api.patch(`app/videos/${props.id}`, formData);
      let new_videos = [];
      if (props.getter.videos) {
        new_videos = { ...props.getter };
        const idx = new_videos.videos.findIndex((video) => video.id == props.id);
        new_videos.videos[idx] = { ...new_video.data };
      } else {
        new_videos = [...props.getter];
        const idx = new_videos.findIndex((video) => video.id == props.id);
        new_videos[idx] = { ...new_video.data };
      }
      props.setter(new_videos);
      toast.add({ title: "Updated video successfully" });
      setopen(false)
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title: error.response.data[field] });
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger
        render={
          <Tooltip>
            <TooltipTrigger
              onClick={() => setopen(true)}
              className="p-2 rounded-full bg-slate-700 cursor-pointer hover:bg-slate-600 transition-all duration-300"
            >
              <FaEdit size={20} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="p-2 rounded-xl font-bold bg-slate-800 text-white">
                Edit
              </p>
            </TooltipContent>
          </Tooltip>
        }
      ></DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Edit Instructor
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <Field className="flex flex-col gap-3">
              <FieldLabel htmlFor="username">Title</FieldLabel>
              <Input
                id="title"
                onChange={(e) => settitle(e.target.value)}
                value={title}
                required
              />
            </Field>
            <Field className="flex flex-col gap-3">
              <FieldLabel className=" rounded-md  cursor-pointer bg-slate-700 p-2" htmlFor="image">
                Change Thumbail
              </FieldLabel>
              <Input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </Field>
            {image && (
              <Attachment className='w-full'>
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{image.name}</AttachmentTitle>
                  <AttachmentDescription className="flex gap-3 items-center">
                    <p className="uppercase">{image.name.split(".")[1]}</p>
                    <p>.</p>
                    <p>{image.size * (1024/1024)} MB</p>
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction onClick={() => setimage("")}>
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            )}

            <button
              className="w-full rounded-xl bg-slate-600 transition-all duration-300 hover:bg-slate-500 cursor-pointer outline-none flex items-center justify-center py-3 font-bold text-lg"
              disabled={loading}
            >
              {loading ? <Spinner className="w-10 h-10" /> : "Update Video"}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditVideo;
