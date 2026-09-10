import React, { useContext } from "react";
import { Progress, ProgressLabel, ProgressValue } from "./ui/progress";
import { WrapperContext } from "./Wrapper";

const InstrctorStudentCard = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
  return (
    <div
      className={`flex flex-col gap-3 p-2 rounded-md ${toggleTheme ? "bg-slate-300":"bg-slate-800"}  md:w-90 w-full text-center`}
    >
      <h1 className={`font-bold w-full p-2 rounded-md text-lg ${toggleTheme ? "bg-slate-200":"bg-slate-600"}`}>
        {props.username}
      </h1>
      <h1 className={`font-bold w-full ${toggleTheme ? "bg-slate-200":"bg-slate-600"} rounded-md p-2`}>
        {props.email}
      </h1>
      <div className={`p-2 rounded-md ${toggleTheme ? "bg-slate-100":"bg-slate-500"} `}>
        <Progress value={props.progress} className="w-full">
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
    </div>
  );
};

export default InstrctorStudentCard;
