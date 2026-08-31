"use client";
import React, { useRef, useState } from "react";
import { GiTeacher } from "react-icons/gi";
import { IoPlaySharp } from "react-icons/io5";
import { FaPause } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { BiSolidVolumeMute } from "react-icons/bi";
import { Spinner } from "./ui/spinner";
import PlayVideo from "./PlayVideo";

const StudentVideoCard = (props) => {
  const [isPlay, setisPlay] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const [isMuted, setisMuted] = useState(true);
  const [loading, setloading] = useState(false);
  const videoRef = useRef();

  const handlePlay = () => {
    setisPlay(true);
    setisPaused(false);
    videoRef.current?.play();
  };

  const handleStop = () => {
    setisPlay(false);
    setisPaused(true);
    setloading(false);
    videoRef.current?.pause();
  };
  return (
    <div className="video w-70 h-90 rounded-md flex flex-col gap-2 ">
      <div
        onMouseEnter={handlePlay}
        onMouseLeave={handleStop}
        className="w-full h-[45%] relative group"
      >
        {loading && (
          <div className="w-full h-full absolute inset-0 z-10 bg-slate-700 flex items-center justify-center rounded-md">
            <Spinner className="text-gray-100 h-10 w-10" />
          </div>
        )}
        {isPlay ? (
          <video
            className="absolute top-0 w-full h-full rounded-md"
            ref={videoRef}
            src={`http://localhost:8000/video/${props.videoUrl}`}
            muted={isMuted}
            onLoadStart={() => setloading(true)}
            onWaiting={() => setloading(true)}
            onPlay={() => setloading(false)}
            loop
            autoPlay
          />
        ) : (
          <img
            src={`http://localhost:8000/upload/${props.thumbnailUrl}`}
            alt="Course Tumbnail"
            className="w-full rounded-md h-full"
          />
        )}
        <PlayVideo
          stop={handleStop}
          getter={props.getter}
          setter={props.setter}
          id={props.id}
          src={`http://localhost:8000/video/${props.videoUrl}`}
        />
        <div className="bg-slate-700 p-2 rounded-full text-gray-100 absolute bottom-0 left-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:bottom-4 hover:bg-slate-800 transition-all duration-300">
          {isPaused ? (
            <IoPlaySharp
              onClick={() => {
                (setisPaused(false), videoRef.current?.play());
              }}
              size={20}
            />
          ) : (
            <FaPause
              onClick={() => {
                (setisPaused(true), videoRef.current?.pause());
              }}
              size={20}
            />
          )}
        </div>
        <div className="bg-slate-700 p-2 rounded-full text-gray-100 absolute top-0 left-4 cursor-pointer opacity-0 group-hover:opacity-100 group-hover:top-4 hover:bg-slate-800 transition-all duration-300">
          {isMuted ? (
            <BiSolidVolumeMute onClick={() => setisMuted(false)} size={20} />
          ) : (
            <GoUnmute onClick={() => setisMuted(true)} size={20} />
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <GiTeacher className="rounded-full text-gray-100" size={35} />
        <h1 className="font-bold text-lg">{props.instructor}</h1>
      </div>
      <h1>{props.course}</h1>

      <div className="flex gap-2 items-center">
        <h1>Title: </h1>
        <h1>{props.title}</h1>
      </div>
      <div className="flex items-center">
        <h1>{props.created_at?.split("T")[0]}</h1>
      </div>
    </div>
  );
};

export default StudentVideoCard;
