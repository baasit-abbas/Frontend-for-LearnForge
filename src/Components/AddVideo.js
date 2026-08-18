"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";

import { FileCodeIcon, XIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";

const AddVideo = (props) => {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [video, setvideo] = useState("");

  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image){
        toast.add({title:"Upload image for thumbnail"})
        return
    }
    if (!video){
        toast.add({title:"Upload video"})
        return
    }
    setloading(true);
    const data = new FormData();
    (data.append("title", title), data.append("course", props.course_id));
    data.append("image", image);
    data.append("video", video);
    try {
      const new_video = await api.post("app/videos", data);
      let new_videos = { ...props.getter };
      new_videos.videos = [...new_videos.videos, new_video.data];
      props.setter(new_videos);
      toast.add({ title: "Uploaded Video Sucessfully" });
      setopen(false);
      setimage("")
      setvideo("")
      settitle("")
    } catch (error) {
      console.log(error);
      for (const field in error.respone.data) {
        toast.add({ title: error.respone.data[field] });
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger className="px-3 py-2 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 transition-all duration-300 cursor-pointer">
        Add Video
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100 text-center text-2xl">
            Add Video
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center  rounded-md w-full p-1"
        >
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="title">
              Title:
            </FieldLabel>
            <Input
              id="title"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => settitle(e.target.value)}
              type="text"
              value={title}
              required
            />
          </Field>
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel
              className="font-bold w-full px-3 py-2 cursor-pointer bg-slate-600 border-2 border-slate-500 rounded-xl"
              htmlFor="doc"
            >
              Upload Thumbnail Image
            </FieldLabel>
            <Input
              id="doc"
              className="hidden"
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              accept="image/*"
            />
          </Field>
          {image && (
            <Attachment className="w-full">
              <AttachmentMedia>
                <FileCodeIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{image.name}</AttachmentTitle>
                <AttachmentDescription className="flex gap-2">
                  <p className="uppercase font-bold">
                    {image.name.split(".")[1]}
                  </p>
                  <p>{(image.size / (1024 * 1024)).toFixed(2)} MB</p>
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction onClick={() => setimage("")}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel
              className="font-bold w-full px-3 py-2 cursor-pointer bg-slate-600 border-2 border-slate-500 rounded-xl"
              htmlFor="video"
            >
              Upload Video
            </FieldLabel>
            <Input
              id="video"
              className="hidden"
              onChange={(e) => setvideo(e.target.files[0])}
              type="file"
              accept="video/*"
            />
          </Field>
          {video && (
            <Attachment className="w-full">
              <AttachmentMedia>
                <FileCodeIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{video.name}</AttachmentTitle>
                <AttachmentDescription className="flex gap-2">
                  <p className="uppercase font-bold">
                    {video.name.split(".")[1]}
                  </p>
                  <p>{(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction onClick={() => setvideo("")}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
          <button
          disabled={loading}
            type="submit"
            className="text-gray-100 bg-slate-600 hover:bg-slate-500 transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold flex items-center justify-center"
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Upload Video"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVideo;
