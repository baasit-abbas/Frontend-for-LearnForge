"use client";
import { FaFilePdf } from "react-icons/fa6";
import { BiSolidFileTxt } from "react-icons/bi";
import { BsFiletypePptx } from "react-icons/bs";
import { TbFileTypeDocx } from "react-icons/tb";
import { FaFileDownload } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";

const StudentDocCard = (props) => {
  const handleMark = async () => {
    const completed = !props.completed;
    try {
      await api.patch(`app/docs/progress/${props.id}`, { completed });
      const old_courses = { ...props.getter };
      const idx = old_courses.docs.docs.findIndex((doc) => doc.id == props.id);
      old_courses.docs.docs[idx].completed = completed;
      if (completed) {
        old_courses.docs.review.completed += 1;
        toast.add({ title: "Markd as completed" });
      } else {
        old_courses.docs.review.completed -= 1;
        toast.add({ title: "Marked as uncompleted" });
      }
      props.setter(old_courses);
    } catch (error) {
      console.log(error);
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
          <button
            onClick={handleMark}
            className="px-3 py-2 cursor-pointer rounded-full bg-slate-700 text-sm font-bold hover:bg-slate-800 transition-all duration-300"
          >
            {props.completed ? "Mark as unread" : "Mark as read"}
          </button>
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
        <h1 className="text-sm text-slate-400 font-bold uppercase tracking-[2]">
          Title
        </h1>
        <h1>{props.title}</h1>
      </div>
      <div className="flex justify-between items-center bg-slate-800 rounded-xl py-2 px-4 border-2 border-slate-500/15">
        <h1 className="text-slate-300">Uploaded By</h1>
        <p className="font-bold uppercase tracking-[5]">{props.instructor}</p>
      </div>
    </div>
  );
};

export default StudentDocCard;
