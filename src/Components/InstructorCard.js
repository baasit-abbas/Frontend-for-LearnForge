"use client";
import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import CardBtn from "@/Components/CardBtn";
import EditInstructor from "./EditInstructor";
import DeleteInstructor from "./DeleteInstructor";

const InstructorCard = (props) => {
  return (
    <div className="h-85 w-145 bg-slate-600 flex flex-col gap-2 px-5 rounded-md">
      <div className="w-full py-3 border-b-2 border-b-slate-800 flex items-center justify-center">
        <h1 className="font-bold text-lg">{props.username}</h1>
      </div>

      <div className="flex gap-7 items-center">
        <div className="flex flex-col gap-5">
          <p className="p-3 bg-slate-800">
            <GiTeacher size={120} />
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
        <div className="flex flex-col gap-3 font-bold text-slate-300 justify-center ">
          <h1>ID:</h1>
          <h1>Username:</h1>
          <h1>Email:</h1>
          <h1>Last Login:</h1>
          <h1>Experience:</h1>
          <h1>Specialization:</h1>
          <h1>Phone Number:</h1>
        </div>
        <div className="flex flex-col gap-3 font-bold justify-center">
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
