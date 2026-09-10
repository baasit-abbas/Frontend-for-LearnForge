"use cleint";
import React, { useContext } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CardBtn from "@/Components/CardBtn";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import { WrapperContext } from "./Wrapper";

const AdminCourseCard = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <div className={`card ${toggleTheme ? "bg-slate-400 text-slate-800":"bg-slate-800 text-slate-100"} md:w-85 w-full h-65 flex flex-col gap-5 p-3`}>
      <h1 className={`${toggleTheme ? "bg-slate-200":"bg-slate-700"} w-full py-2 rounded-md text-center h-[20%]`}>
        {props.title}
      </h1>
      <p className={`h-[30%] ${toggleTheme ? "bg-slate-100":"bg-slate-600"} rounded-md p-1`}>{props.description}</p>
      <div className="flex flex-col gap-4 h-[50%]">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col gap-1">
            <h1 className={`font-bold ${toggleTheme ? "text-slate-700":"text-slate-300"}`}>Author</h1>
            <p>{props.instructor}</p>
          </div>
          <Progress value={props.progress} className="w-[50%] max-w-sm b">
            <ProgressLabel>Progress</ProgressLabel>
            <ProgressValue />
          </Progress>
        </div>
        <div className="flex gap-3 w-full items-center justify-between">
          <CardBtn
            href={`${props.href == "instructor" ? `/instructor/courses/${props.id}` : `/admin/courses/${props.id}`}`}
            text="View Course"
            icon={<FaEye size={20} />}
          />
          <EditCourse
            id={props.id}
            title={props.title}
            description={props.description}
            setter={props.setter}
            getter={props.getter}
            icon={<FaEdit size={20} />}
          />
          <DeleteCourse
            id={props.id}
            setter={props.setter}
            getter={props.getter}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCard;
