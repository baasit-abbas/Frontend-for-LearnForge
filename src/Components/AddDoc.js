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

const AddDoc = (props) => {
  const [title, settitle] = useState("");
  const [file, setfile] = useState("");

  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = new FormData();
    (data.append("title", title), data.append("course", props.course_id));
    data.append("file", file);
    try {
      const new_doc = await api.post("app/docs", data);
      let new_docs = { ...props.getter };
      new_docs.docs = [...new_docs.docs,new_doc.data];
      props.setter(new_docs);
      toast.add({ title: "Added Document Sucessfully" });
      setopen(false);
    } catch (error) {
      console.log(error);
      for (const field in error.respone.data) {
        toast.add({ title: error.respone.data[field] });

      }
    }
    finally{
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger className="px-3 py-2 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 transition-all duration-300 cursor-pointer">
        Add Document
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100 text-center text-2xl">
            Add Document
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
              Upload Document
            </FieldLabel>
            <Input
              id="doc"
              className="hidden"
              onChange={(e) => setfile(e.target.files[0])}
              type="file"
              required
            />
          </Field>
          {file && (
            <Attachment className="w-full">
              <AttachmentMedia>
                <FileCodeIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription className="flex gap-2">
                  <p className="uppercase font-bold">
                    {file.name.split(".")[1]}
                  </p>
                  <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction onClick={() => setfile("")}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}

          <button
            type="submit"
            className="text-gray-100 bg-slate-600 hover:bg-slate-500 transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold flex items-center justify-center"
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Add Document"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoc;
