"use client";
import React from "react";
import { FaEye } from "react-icons/fa";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import Link from "next/link";

const StudentCourseCard = (props) => {
  return (
    <div className={`card bg-slate-800 w-85 "h-65"  flex flex-col gap-5 p-3`}>
      <h1 className="bg-slate-700 w-full py-2 rounded-md text-center h-[20%]">
        {props.title}
      </h1>
      <p className="h-[30%] bg-slate-600 rounded-md p-1">{props.description}</p>
      <div className="flex flex-col gap-4 h-[50%]">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col gap-1">
            <h1 className="fonf-bold text-slate-300">Author</h1>
            <p>{props.instructor}</p>
          </div>
          <Progress value={props.progress} className="w-[50%] max-w-sm b">
            <ProgressLabel>Progress</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <Link href={`/student/course/${props.id}`} className="w-full py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-all duration-300 flex items-center justify-center gap-7">
          <FaEye size={25} />
          <h1 className="font-bold text-lg">View Course</h1>
        </Link>
      </div>
    </div>
  );
};

export default StudentCourseCard;
