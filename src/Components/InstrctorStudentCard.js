import React from "react";
import { Progress, ProgressLabel, ProgressValue } from "./ui/progress";

const InstrctorStudentCard = (props) => {
  return (
    <div
      className="flex flex-col gap-3 p-2 rounded-md bg-slate-800 w-90 text-center"
    >
      <h1 className="font-bold w-full p-2 rounded-md text-lg bg-slate-600 ">
        {props.username}
      </h1>
      <h1 className="font-bold w-full bg-slate-600 rounded-md p-2">
        {props.email}
      </h1>
      <div className="p-2 rounded-md bg-slate-500">
        <Progress value={props.progress} className="w-full">
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    </div>
  );
};

export default InstrctorStudentCard;
