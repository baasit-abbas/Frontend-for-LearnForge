"rafce";
import React from "react";
import CardBtn from "./CardBtn";
import { FaEye } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import EditStudent from "./EditStudent";
import Delete from "./DeleteStudent";

const StudentCard = (props) => {
  return (
    <div className="card w-140 rounded-md bg-slate-600 px-3 py-2 flex flex-col text-gray-100 gap-5">
      <div className="flex justify-center items-center py-2 border-b-2 border-slate-900">
        <h1 className="font-bold text-lg">{props.username}</h1>
      </div>
      <div className="flex gap-4 px-5 items-center ">
        <div className="flex flex-col gap-1">
          <div className="p-3 bg-slate-800 text-center">
            <PiStudentBold size={120} />
          </div>
          <div className="flex gap-2 justify-around">
            <CardBtn icon={<FaEye size={20} />} text="View Student" href={`/student/${props.id}`} />
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
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-slate-300">ID:</h1>
          <h1 className="font-bold text-slate-300">Username:</h1>
          <h1 className="font-bold text-slate-300">Email:</h1>
          <h1 className="font-bold text-slate-300">Last Login:</h1>
          <h1 className="font-bold text-slate-300">Date of Birth:</h1>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-100 font-bold">{props.id}</p>
          <p className="text-gray-100 font-bold">{props.username}</p>
          <p className="text-gray-100 font-bold">{props.email}</p>
          <p className="text-gray-100 font-bold">{props.last_login}</p>
          <p className="text-gray-100 font-bold">{props.date_of_birth}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
