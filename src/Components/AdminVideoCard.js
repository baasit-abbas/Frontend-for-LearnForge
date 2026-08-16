"use client";
import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import { FaPause } from "react-icons/fa";

const AdminVideoCard = (props) => {
  const [title, settitle] = useState(props.title);
  const [isPlay, setisPlay] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const videoRef = useRef();
  return (
    <div className="video w-70 h-90 rounded-md flex flex-col gap-3">
      <div
        onMouseEnter={() => {
          (setisPlay(true), videoRef.current?.play(), setisPaused(false));
        }}
        onMouseLeave={() => {
          (setisPlay(false), videoRef.current?.pause(), setisPaused(true));
        }}
        className="w-full h-[45%] relative group"
      >
        {isPlay ? (
          <video
            ref={videoRef}
            src={`http://localhost:8000/upload/${props.videoUrl}`}
            muted
            loop
          />
        ) : (
          <img
            src={`http://localhost:8000/upload/${props.thumbnailUrl}`}
            alt="Course Tumbnail"
            className="w-full rounded-md h-full"
          />
        )}
        <div className="bg-slate-700 p-1 rounded-full text-gray-100 absolute bottom-0 right-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bottom-4 hover:bg-slate-800 transition-all duration-300 ">
          <FaRegPlayCircle size={30} />
        </div>
        <div className="bg-slate-700 p-2 rounded-full text-gray-100 absolute bottom-0 left-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bottom-4 hover:bg-slate-800 transition-all duration-300">
          {isPaused ? (
            <FaPause onClick={() => {setisPaused(false) , videoRef.current?.play()}} size={20} />
          ) : (
            <IoPlaySharp onClick={() => {setisPaused(true) , videoRef.current?.pause()}} size={20} />
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <GiTeacher className="rounded-full text-gray-100" size={35} />
        <h1 className="font-bold text-lg">{props.instructor}</h1>
      </div>
      <h1>{props.course_name}</h1>

      <div>Title : {title}</div>
      <div className="flex justify-between items-center">
        <h1>{props.created_at?.split("T")[0]}</h1>
        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-slate-700">
            <FaEdit size={20} />
          </button>
          <button className="p-2 rounded-full bg-slate-700">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoCard;
