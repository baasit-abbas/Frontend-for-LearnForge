"use client";
import React, { useContext } from "react";
import CardBtn from "./CardBtn";
import { FaEye } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import EditStudent from "./EditStudent";
import Delete from "./DeleteStudent";
import { WrapperContext } from "./Wrapper";

const StudentCard = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <div className={`card md:w-140 w-full rounded-md ${toggleTheme ? "bg-slate-300 text-slate-800":"bg-slate-600 text-gray-100"}  md:px-3 px-0 py-2 flex flex-col md:gap-5 gap-2`}>
      <div className={`flex justify-center items-center py-2 border-b-2 ${toggleTheme ? "border-slate-200":"border-slate-900"} `}>
        <h1 className="font-bold text-lg">{props.username}</h1>
      </div>
      <div className="flex md:gap-4 gap-2 md:px-5 px-2 items-center">
        <div className="flex flex-col gap-1">
          <div className={`p-3 ${toggleTheme ? "bg-slate-200 text-slate-700":"bg-slate-800 text-slate-100"}  text-center`}>
            <PiStudentBold size={120} />
          </div>
          <div className="flex gap-2 justify-around">
            <CardBtn icon={<FaEye size={20} />} text="View Student" href={`/admin/students/${props.id}`} />
            <EditStudent
              id={props.id}
              username={props.username}
              email={props.email}
              dob={props.date_of_birth}
              setter={props.setter}
              getter={props.getter}
            />
            <Delete id={props.id} setter={props.setter} getter={props.getter} />
          </div>
        </div>
        <div className="flex flex-col gap-3 font-bold md:text-md text-sm">
          <h1 >ID:</h1>
          <h1 >Username:</h1>
          <h1 >Email:</h1>
          <h1 >Last Login:</h1>
          <h1 >Date of Birth:</h1>
        </div>
        <div className="flex flex-col gap-3 font-bold md:text-md text-sm">
          <p >{props.id}</p>
          <p>{props.username}</p>
          <p>{props.email}</p>
          <p>{props.last_login}</p>
          <p>{props.date_of_birth}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
