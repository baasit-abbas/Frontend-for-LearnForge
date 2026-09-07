"use client";
import McqCard from "@/Components/McqCard";
import { QuizContext } from "@/Components/QuizProvider";
import ShortAnswer from "@/Components/ShortAnswer";
import TrueFalseCard from "@/Components/TrueFalseCard";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Page = () => {
  const {quiz, setquiz} = useContext(QuizContext);
  const params = useParams();
  useEffect(() => {
    const loadData = async () => {
      const id = params.id;
      const response = await api.get(`app/quiz/${id}`);
      setquiz(response.data)
    };
    loadData()
  }, []);

  return (
    <div className="flex flex-col gap-10 m-auto mb-5">
      <div className="flex flex-col m-auto gap-3 mt-10 text-center">
        <h1 className="font-bold text-3xl">{quiz.title}</h1>
        <p className="font-bold text-xl">Attempted: {quiz.attempted}</p>
        <p className="font-bold text-xl">Correct : {quiz.correct}</p>
      </div>
      <div className="flex flex-col gap-3 m-auto">
        {quiz?.type == "mcqs"
          ? quiz?.data?.map((mcq) => {
              return (
                <McqCard
                  key={mcq.id}
                  quiz_id={quiz.id}
                  course_id={quiz.course}
                  id={mcq.id}
                  statment={mcq.statment}
                  correct={mcq.correct}
                  selected={mcq.selected}
                  options={mcq.options}
                  quiz={quiz}
                  setquiz={setquiz}
                />
              );
            })
          : quiz?.type == "true/false"
            ? quiz?.data?.map((true_false) => {
                return (
                  <TrueFalseCard
                    key={true_false.id}
                    quiz_id={quiz.id}
                    course_id={quiz.course}
                    id={true_false.id}
                    statment={true_false.statment}
                    correct={true_false.correct}
                    selected={true_false.selected}
                    quiz={quiz}
                    setquiz={setquiz}
                  />
                );
              })
            : quiz?.data?.map((short) => {
                return (
                  <ShortAnswer
                    key={short.id}
                    id={short.id}
                    quiz_id={quiz.id}
                    course_id={quiz.course}
                    statment={short.statment}
                    selected={short.selected}
                    marks={short.marks}
                    quiz={quiz}
                    setquiz={setquiz}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default Page;
