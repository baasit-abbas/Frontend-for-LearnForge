"use client"
import React, { useState } from "react";
import McqOptionCard from "./McqOptionCard";

const McqCard = (props) => {
    const [selected, setselected] = useState("")
    console.log(props.statment)
  return (
    <div className="flex flex-col gap-3 w-250 py-5 px-3 rounded-md text-gray-100 bg-slate-800">
      <p className="font-bold">{props.statment}</p>
      <div className="flex flex-col bg-slate-800 rounded-md">
        {props.options.map((option) => {
          return (
            <McqOptionCard
              key={option.id}
              course_id = {props.course_id}
              quiz_id={props.quiz_id}
              mcq_id = {props.id}
              id={option.id}
              statment={option.statment}
              correct={props.correct}
              selected = {selected}
              setselected = {setselected}
              quiz={props.quiz}
              setquiz={props.setquiz}
            />
          );
        })}
      </div>
    </div>
  );
};

export default McqCard;
