"use client";
import React, { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import CardBtn from "@/Components/CardBtn";
import EditInstructor from "./EditInstructor";
import DeleteInstructor from "./DeleteInstructor";
import { WrapperContext } from "./Wrapper";

const InstructorCard = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <div className={`md:h-85 h-75 md:w-145 w-full ${toggleTheme ? "bg-slate-300 text-slate-800":"bg-slate-600 text-slate-100"}  flex flex-col gap-2 md:px-5 px-2 rounded-md`}>
      <div className="w-full py-3 border-b-2 border-b-slate-800 flex items-center justify-center">
        <h1 className="font-bold text-lg">{props.username}</h1>
      </div>
      <div className="flex md:gap-7 gap-2 items-center">
        <div className="flex flex-col gap-5">
          <p className={`p-3 ${toggleTheme ? "bg-slate-200 text-slate-700":"bg-slate-800 text-slate-100"} `}>
            <GiTeacher className="md:text-[120px] text-[100px]" />
          </p>
          <div className="flex gap-2 w-full justify-between">
            <CardBtn
              icon={<FaEye size={20} />}
              text="View"
              href={`/admin/instructors/${props.id}`}
            />
            <EditInstructor
              id={props.id}
              username={props.username}
              email={props.email}
              specialization={props.specialization}
              experience_years={props.experience_years}
              getter={props.getter}
              setter={props.setter}
            />
            <DeleteInstructor id={props.id} getter={props.getter}
              setter={props.setter}/>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-bold justify-center md:text-md text-sm">
          <h1>ID:</h1>
          <h1>Username:</h1>
          <h1>Email:</h1>
          <h1>Last Login:</h1>
          <h1>Experience:</h1>
          <h1>Specialization:</h1>
          <h1>Phone Number:</h1>
        </div>
        <div className="flex flex-col gap-3 font-bold justify-center  md:text-md text-sm">
          <h1>{props.id}</h1>
          <h1>{props.username}</h1>
          <h1>{props.email}</h1>
          <h1>
            {props.last_login
              ? props.last_login.split("T")[0]
              : "No logined yet"}
          </h1>
          <h1>{props.experience_years} Years</h1>
          <h1>{props.specialization}</h1>
          <h1>{props.phone}</h1>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
