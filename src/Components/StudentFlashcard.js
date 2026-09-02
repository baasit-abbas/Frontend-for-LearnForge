"use client";
import api from "@/utils/authClient";
import React, { useState } from "react";
import { toast } from "./ui/toast";

const StudentFlashcard = (props) => {
  const [flipped, setflipped] = useState(false);
  const handleSubmit = async (e) => {
    e.stopPropagation();
    const quality = e.currentTarget.id;
    try {
      const response = await api.patch(`app/flashcards/selected/${props.id}`, {
        quality,
      });
      console.log(props.id)
      const old_course = { ...props.getter };
      old_course.flashcards.flashcards = old_course.flashcards.flashcards.filter((flash) => flash.id != props.id);
      old_course.flashcards.review = { ...response.data };
      props.setter(old_course);
      toast.add({ title: "Response added successfully" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => setflipped(!flipped)}
      className={`h-56 w-96 transform-3d relative cursor-pointer transition-transform duration-500 ${flipped ? "rotate-y-180" : ""}`}
    >
      <div className="absolute inset-0 p-4 flex items-center justify-center bg-white text-gray-800 backface-hidden rounded-lg text-lg">
        {props.front_text}
      </div>
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-center bg-gray-900 text-gray-100 backface-hidden rotate-y-180 rounded-lg gap-4">
        <h1 className="text-sm h-[90%] flex items-center justify-center">
          {props.back_text}
        </h1>
        <p className="text-sm">How difficult you find it?</p>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleSubmit}
            id="Again"
            className="bg-red-500 hover:bg-red-400 text-sm p-1 rounded-md cursor-pointer"
          >
            Again
          </button>
          <button
            onClick={handleSubmit}
            id="Hard"
            className="bg-yellow-500 hover:bg-yellow-400 text-sm p-1 rounded-md cursor-pointer"
          >
            Hard
          </button>
          <button
            id="Good"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-400 text-sm p-1 rounded-md cursor-pointer"
          >
            Good
          </button>
          <button
            onClick={handleSubmit}
            id="Easy"
            className="bg-green-500 hover:bg-green-400 text-sm p-1 rounded-md cursor-pointer"
          >
            Easy
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFlashcard;
