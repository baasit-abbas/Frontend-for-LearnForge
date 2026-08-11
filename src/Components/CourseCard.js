"use cleint";
import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CardBtn from "@/Components/CardBtn";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import EditCourse from "./EditCourse";

const CourseCard = (props) => {
  return (
    <div
      className={`card bg-slate-700 w-85 ${props.role == "Admin" ? "h-65" : "h-55"} flex flex-col gap-5 p-3`}
    >
      <h1 className="bg-slate-800 w-full py-2 rounded-md text-center h-[20%]">
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
        {props.role == "Admin" && (
          <div className="flex gap-3 w-full items-center justify-between">
            <EditCourse
              id={props.id}
              title={props.title}
              description={props.description}
              setter={props.setter}
              getter={props.getter}
              text="Edit"
              icon={<FaEdit size={20} />}
            />
            <CardBtn text="Delete" icon={<MdDelete size={20} />} />
            <CardBtn
              href={"/course"}
              text="View Course"
              icon={<FaEye size={20} />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
