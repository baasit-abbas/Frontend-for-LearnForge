"use client";
import api from "@/utils/authClient";
import React, { useContext, useState } from "react";
import { WrapperContext } from "./Wrapper";

const McqOptionCard = (props) => {
  const { toggleTheme } = useContext(WrapperContext);
  const handleSelect = async () => {
    try {
      const response = await api.patch(
        `app/quiz/${props.quiz_id}/selected/${props.mcq_id}`,
        { course_id: props.course_id, selected: props.statment },
      );
      props.setselected(props.statment);
      const review = response.data.quiz;
      let new_quiz = { ...props.quiz };
      const { data, ...rest } = new_quiz;
      new_quiz = {
        ...review,
        data: data,
      };
      props.setquiz(new_quiz);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => !props.selected && handleSelect()}
      className={`${!props.selected ? toggleTheme ? "bg-slate-100 hover:bg-slate-50 cursor-pointer" : "bg-slate-800 hover:bg-slate-700 cursor-pointer" : props.correct == props.statment ? "bg-green-500" : props.selected == props.statment ? "bg-red-500" : toggleTheme ? "bg-slate-100 hover:bg-slate-50" : "bg-slate-800 hover:bg-slate-700"} w-full px-3  py-2 transition-all duration-300 rounded-md`}
    >
      {props.statment}
    </div>
  );
};

export default McqOptionCard;
