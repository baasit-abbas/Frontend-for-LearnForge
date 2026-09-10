"use client"
import api from "@/utils/authClient";
import React, { useContext, useState } from "react";
import { WrapperContext } from "./Wrapper";

const TrueFalseCard = (props) => {
  const {toggleTheme} = useContext(WrapperContext)
    const handleTrueFalse = async (e) => { 
        if (props.selected != null){
            return
        }
        const selected = e.currentTarget.id
        const response = await api.patch(`app/quiz/${props.quiz_id}/selected/${props.id}`,{selected,"course_id":props.course_id})
        let new_quiz = {...props.quiz}
        let {data,...rest} = new_quiz
        const idx = data.findIndex(trueFale => trueFale.id == props.id)
        data[idx] = response.data.selected
        new_quiz = {...response.data.quiz,data}
        console.log(new_quiz)
        props.setquiz(new_quiz)
    }
  return (
    <div
      className={`md:w-250 w-full h-20 rounded-lg ${props.selected == null ? toggleTheme ? "bg-slate-300 hover:bg-slate-200":  "bg-slate-900 hover:bg-slate-800" : props.correct == props.selected ? "bg-green-500":"bg-red-500"}  transition-all duration-300 flex items-center justify-between md:px-5 px-2 gap-3`}
    >
      <p className="font-bold md:text-lg  text-sm md:w-[85%] w-[75%]">{props.statment}</p>
      <div className="md:w-[15%] w-[25%] flex items-center gap-3">
        <button
          id="true"
          onClick={(e) => {props.selected == null && handleTrueFalse(e)}}
          className={`${props.selected != null && props.correct == true ? "bg-green-600":toggleTheme ? "bg-slate-100 hover:bg-slate-50" : "bg-slate-600 hover:bg-slate-500"} transition-all duration-300 cursor-pointer md:px-3 p-2  md:text-md text-sm md:py-2 rounded-lg`}
        >
          True
        </button>
        <button
          id="false"
          onClick={(e) => {props.selected == null && handleTrueFalse(e)}}
          className={`${props.selected != null && props.correct == false ? "bg-green-600": toggleTheme ? "bg-slate-100 hover:bg-slate-50" : "bg-slate-600 hover:bg-slate-500"} transition-all duration-300 cursor-pointer md:px-3 p-2  md:text-md text-sm md:py-2 rounded-lg`}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default TrueFalseCard;
