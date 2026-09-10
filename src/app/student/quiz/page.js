"use client";
import McqCard from "@/Components/McqCard";
import { QuizContext } from "@/Components/QuizProvider";
import ShortAnswer from "@/Components/ShortAnswer";
import TrueFalseCard from "@/Components/TrueFalseCard";
import { Input } from "@/Components/ui/input";
import { Spinner } from "@/Components/ui/spinner";
import { toast } from "@/Components/ui/toast";
import { WrapperContext } from "@/Components/Wrapper";
import api from "@/utils/authClient";
import React, { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";

const Page = () => {
  const { setselected, quizes, setquizes, quiz, setquiz } =
    useContext(QuizContext);
  const [question, setquestion] = useState("");
  const [loading, setloading] = useState(false);
  const {toggleTheme} = useContext(WrapperContext)

  const handleQuiz = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await api.post("app/quiz", { question });
      const { data, ...quiz_info } = response.data;
      setquiz(response.data);
      setquizes((prev) => [quiz_info, ...prev]);
      setselected(quiz_info.id);
    } catch (error) {
      console.log(error);
      if (error in error.response?.data) {
        toast.add({ title: error.response.data[error] });
      } else {
        toast.add({ title: "Error while generating quiz. Try again" });
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {!quiz ? (
        loading ? (
          <Spinner className="w-20 h-20 self-center m-auto" />
        ) : (
          <div className="flex flex-col gap-8 self-center md:w-[50%] w-[99%] text-center m-auto">
            <h1 className="font-bold text-xl w-full">
              Generate quizzes from your enrolled courses with MCQs,
              short-answer questions, and true/false questions.
            </h1>
            <form className="w-full relative" onSubmit={handleQuiz}>
              <Input
                onChange={(e) => setquestion(e.target.value)}
                className={`p-3 w-full pr-15 ${toggleTheme ? "placeholder:text-slate-800":"placeholder:text-slate-500"}`}
                placeholder="Enter the topic, question type, and number of questions to generate."
              />
              <button
                type="submit"
                className="p-2 rounded-md  hover:bg-slate-800 transition-all duration-300 absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer"
              >
                <IoSend size={20} />
              </button>
            </form>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-10 m-auto mb-5">
          <div className="flex flex-col m-auto gap-3 mt-10 text-center">
            <h1 className="font-bold md:text-3xl text-xl">{quiz.title}</h1>
            <p className="font-bold md:text-xl text-lg">Attempted: {quiz.attempted}</p>
            <p className="font-bold md:text-xl text-lg">Correct : {quiz.correct}</p>
          </div>
          <div className="flex flex-col gap-3 m-auto">
            {quiz.type == "mcqs"
              ? quiz.data.map((mcq) => {
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
              : quiz.type == "true/false"
                ? quiz.data.map((true_false) => {
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
                : quiz.data.map((short) => {
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
      )}
    </div>
  );
};

export default Page;
