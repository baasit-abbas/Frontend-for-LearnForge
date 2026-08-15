"use client";
import React, { useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { BiSolidFileTxt } from "react-icons/bi";
import { BsFiletypePptx } from "react-icons/bs";
import { TbFileTypeDocx } from "react-icons/tb";
import { FaEdit, FaFileDownload } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { toast } from "./ui/toast";
import api from "@/utils/authClient";
import { Input } from "./ui/input";
import DeleteDoc from "./DeleteDoc";

const AdminDocCard = (props) => {
  const [change, setchange] = useState(false);
  const [title, settitle] = useState(props.title);
  const inputRef = useRef();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`app/docs/${props.id}`, { title });
      let new_docs = []
      if (props.getter.docs) {
        new_docs = { ...props.getter };
        const idx = new_docs.docs.filter((doc) => doc.id == props.id);
        new_docs.docs[idx] = { ...new_docs.docs[idx], title: title };
      }
      else{
        new_docs = [...props.getter]
        const idx = new_docs.filter((doc) => doc.id == props.id);
        new_docs[idx] = { ...new_docs[idx], title: title };
      }
      props.setter(new_docs);
      setchange(false);
      toast.add({ title: "Updated title Successfully" });
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title: error.response.data[field] });
        setchange(false);
      }
    }
  };

  return (
    <div className="bg-slate-900/80 text-gray-100 p-4 rounded-xl border-2 border-slate-500 w-140 flex flex-col gap-4 ">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-700">
            {props.fileType == "pdf" ? (
              <FaFilePdf size={22} />
            ) : props.fileType == "txt" ? (
              <BiSolidFileTxt size={22} />
            ) : props.fileType == "docx" ? (
              <TbFileTypeDocx size={22} />
            ) : (
              <BsFiletypePptx size={22} />
            )}
          </div>
          <div className="flex-col flex justify-center ">
            <h1 className="text-lg">{props.course}</h1>
            <p className="text-sm text-slate-400">
              Uploaded by {props.instructor}
            </p>
          </div>
        </div>
        <div className="flex gap-3 self-start">
          <DeleteDoc
            id={props.id}
            setter={props.setter}
            getter={props.getter}
          />
          <Tooltip>
            <Link
              href={`http://localhost:8000/upload/${props.fileUrl}`}
              target="_blank"
            >
              <TooltipTrigger className="px-3 py-2 cursor-pointer rounded-full bg-slate-700 uppercase text-sm font-bold hover:bg-slate-800 transition-all duration-300">
                <FaFileDownload size={20} />
              </TooltipTrigger>
            </Link>
            <TooltipContent className="bg-slate-800 text-gray-100 py-2 font-bold">
              Download
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-1 bg-slate-800 rounded-xl py-2 px-4 border-2 border-slate-500/15">
        <h1 className="text-sm text-slate-400 font-bold uppercase tracking-[2]">Title</h1>
        <div className="flex gap-5 items-center justify-between">
          <form className="w-[80%]" onSubmit={handleEdit}>
            <Input
              ref={inputRef}
              onBlur={handleEdit}
              onChange={(e) => settitle(e.target.value)}
              type="text"
              value={title}
              disabled={!change}
              className="w-full py-2 px-1 border-none"
            />
          </form>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                (setchange(true),
                  (inputRef.current.disabled = false),
                  inputRef.current.focus());
              }}
              className="px-3 py-2 cursor-pointer rounded-xl bg-slate-700 uppercase text-sm font-bold hover:bg-slate-800 transiti on-all duration-300"
            >
              <FaEdit size={20} />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 text-gray-100 py-2 font-bold">
              Change Title
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-between items-center bg-slate-800 rounded-xl py-2 px-4 border-2 border-slate-500/15">
        <h1 className="text-slate-300">Uploaded By</h1>
        <p className="font-bold">{props.instructor}</p>
      </div>
    </div>
  );
};

export default AdminDocCard;
