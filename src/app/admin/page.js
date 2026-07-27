"use client";
import LoaderLogin from "@/Components/LoaderLogin";
import api from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiVideoFill } from "react-icons/ri";
import { MdQuiz } from "react-icons/md";
import { IoIosFlash } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";

import Card from "@/Components/Card";

const Page = () => {
  const router = useRouter();

  const [admin, setadmin] = useState("");
  const [student, setstudents] = useState(0);
  const [instructor, setinstructor] = useState(0);
  const [courses, setcourses] = useState(0);
  const [docs, setdocs] = useState(0);
  const [videos, setvideos] = useState(0);
  const [quiz, setquiz] = useState(0);
  const [flashcards, setflashcards] = useState(0);
  const [chats, setchats] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const adminProfile = await api.get("app/getProfile");
        setadmin(adminProfile.data);
        const students = await api.get("app/student");
        setstudents(students.data.length);
        const instructors = await api.get("app/instructor");
        setinstructor(instructors.data.length);
        const course = await api.get("app/course");
        setcourses(course.data.length);
        const docs = await api.get("app/docs");
        setdocs(docs.data.length);
        const videos = await api.get("app/videos");
        setvideos(videos.data.length);
        const quiz = await api.get("app/quiz");
        setquiz(quiz.data.length);
        const flascard = await api.get("app/flashcards");
        setflashcards(flascard.data.length);
        const chat = await api.get("app/chat");
        setchats(chat.data.length);
        setloading(false);
      } catch (error) {
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-linear-to-bl from-blue-700 to-purple-800 flex flex-col gap-5 items-center justify-center text-gray-100 p-4">
      <div className="w-[80%] h-[15%] bg-linear-to-r from-purple-600 to-blue-600 rounded-xl p-3 flex items-center justify-between">
        <h1 className=" tracking-[5px] font-bold text-2xl uppercase">
          LeranForge
        </h1>
        <h1 className="text-4xl font-bold flex gap-2">
          Welcome,<p className="text-blue-950 font-bold">{admin.username}</p>
        </h1>
        <h1 className="font-bold text-3xl">Admin Panel</h1>
      </div>
      <div className="w-[80%] min-h-[80%] bg-linear-to-r from-purple-600 to-blue-600 rounded-xl p-3">
        <div className="flex flex-wrap gap-4">
          <Card
            icon={<PiStudentBold size={50} />}
            name="Students"
            var={student}
          />
          <Card
            icon={<GiTeacher size={50} />}
            name="Instructors"
            var={instructor}
          />
          <Card 
             icon={<FaBook size={50} />} 
             name="Courses" 
             var={courses} />
          <Card 
             icon={<SiGoogledocs size={50} />} 
             name="Documents" 
             var={docs} />
          <Card 
             icon={<RiVideoFill size={50} />} 
             name="Videos" 
             var={videos} />
          <Card 
             icon={<MdQuiz size={50} />} 
             name="Quizes" 
             var={quiz} />
          <Card 
             icon={<IoIosFlash size={50} />} 
             name="Flashcards" 
             var={flashcards} />
          <Card 
             icon={<BsFillChatDotsFill size={50} />} 
             name="Chats" 
             var={chats} />
        </div>
  
      </div>
    </div>
  );
};

export default Page;
