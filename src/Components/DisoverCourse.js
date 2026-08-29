"use client";
import React, { useState } from "react";
import { Spinner } from "./ui/spinner";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { toast } from "./ui/toast";
import api from "@/utils/authClient";

const DisoverCourse = (props) => {
  const [loading, setloading] = useState(false);

  const handleEnroll = async (id) => {
    setloading(true);
    try {
      await api.post(`app/enroll/${id}`);
      let new_courses = props.courses.filter((course) => course.id != id);
      props.setcourses(new_courses);
      toast.add({ title: "Sucessfully Enrolled in a course." });
    } catch (error) {
      console.log(error);
      toast.add({ title: "Something went wrong. Please try again." });
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="card flex flex-col justify-center gap-4 rounded-md bg-slate-800 w-140 p-2">
      <h1 className="w-full py-2 text-center bg-slate-700 rounded-md">
        {props.title}
      </h1>
      <p className="w-full py-2 text-center rounded-md bg-slate-700">
        {props.description}
      </p>
      <div className="flex items-center justify-between py-2 w-full">
        <div className="flex flex-col justify-center gap-1 font-bold px-4 py-1">
          <h1 className="text-slate-400">Author</h1>
          <p>{props.instructor}</p>
        </div>
        <button
          onClick={() => handleEnroll(props.id)}
          disabled={loading}
          className="cursor-pointer px-3 py-2 rounded-md bg-slate-950 hover:bg-slate-900 transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <Spinner className="w-5 h-5" />
          ) : (
            <div className="flex gap-2 items-center">
              <BsFillRocketTakeoffFill size={15} />
              <p className="font-bold">Enroll</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DisoverCourse;
