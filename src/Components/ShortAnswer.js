"use client";
import React, { useContext, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroupTextarea } from "@/components/ui/input-group";
import api from "@/utils/authClient";
import { Spinner } from "./ui/spinner";
import { WrapperContext } from "./Wrapper";
const ShortAnswer = (props) => {
  const [loading, setloading] = useState(false);
  const [answer, setanswer] = useState(props.selected);
  const {toggleTheme} = useContext(WrapperContext)
  const handleShort = async () => {
    if (props.selected != "") {
      return;
    }
    setloading(true);
    const response = await api.patch(
      `app/quiz/${props.quiz_id}/selected/${props.id}`,
      { selected: answer, course_id: props.course_id },
    );
    console.log(response.data)
    let new_quiz = { ...props.quiz };
    let { data, ...rest } = new_quiz;
    const idx = data.findIndex((short) => short.id == props.id);
    data[idx] = response.data.selected;
    console.log(data)
    new_quiz = { ...response.data.quiz, data };
    props.setquiz(new_quiz);
    setloading(false);
  };
  return (
    <div className={`flex flex-col gap-5 px-3 py-2 ${toggleTheme ? "bg-slate-300":"bg-slate-800"}  w-250`}>
      <h1 className="font-bold text-lg">{props.statment}</h1>
      <Field>
        <FieldLabel htmlFor="answer">Your answer:</FieldLabel>
        <InputGroupTextarea
          onChange={(e) => setanswer(e.target.value)}
          id="answer"
          placeholder="Write your answer here"
          value={answer}
          className={`${toggleTheme ? 'placeholder:text-slate-500' : 'placeholder:text-slate-400'}`}
        />
      </Field>
      {props.selected == "" ? (
        <button
          disabled={loading}
          onClick={handleShort}
          className={`px-3 py-2 rounded-lg ${toggleTheme ? "bg-slate-100 hover:bg-slate-50 text-slate-900":"bg-slate-700 hover:bg-slate-600 text-slate-100"}  transition-all duration-300 cursor-pointer flex items-center justify-center`}
        >
          {loading ? <Spinner className="w-8 h-8" /> : "Submit Answer"}
        </button>
      ) : (
        <div className={`px-3 py-2 rounded-lg ${toggleTheme ? "bg-slate-100 hover:bg-slate-50 text-slate-900":"bg-slate-700 hover:bg-slate-600 text-slate-100"} transition-all duration-300 flex items-center justify-center text-lg`}>
          Your marks : {props.marks}
        </div>
      )}
    </div>
  );
};

export default ShortAnswer;
