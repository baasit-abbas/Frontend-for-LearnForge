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
import CircularProgressBar from "@/Components/CircularProgressBar";
import LineChartComp from "@/Components/LineChartComp";

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
  const [active, setactive] = useState(0);
  const [lastRegistered, setlastRegistered] = useState(0);
  const [lastCourses, setlastCourses] = useState(0);
  const [averge_quiz, setaverge_quiz] = useState(0);
  const [averge_complition, setaverge_complition] = useState(0)
  const [registeration_per_month, setregisteration_per_month] = useState([])
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const adminProfile = await api.get("app/getProfile");
        setadmin(adminProfile.data);
        const students = await api.get("app/student");
        setstudents(students.data.length);
        const registered = await api.get('app/student/registeration')
        setregisteration_per_month(registered.data)
        const active = students.data.filter((item) => item.is_active === true);
        setactive(active.length);
        const two_days = 2*24*60*60*1000
        const lastRegister = students.data.filter(
          (item) => Date.now() - new Date(item.date_joined).getTime() <= two_days,
        );
        setlastRegistered(lastRegister.length);
        const instructors = await api.get("app/instructor");
        setinstructor(instructors.data.length);
        const course = await api.get("app/course");
        setcourses(course.data.course.length);
        setaverge_complition(course.data.average)
        const lastCourses = course.data.course.filter((item) => 
            Date.now() - new Date(item.created_at).getTime() <= two_days
      );
        setlastCourses(lastCourses.length)
        const docs = await api.get("app/docs");
        setdocs(docs.data.length);
        const videos = await api.get("app/videos");
        setvideos(videos.data.length);
        const quiz = await api.get("app/quiz");
        setquiz(quiz.data.length);
        const averge_quiz = await api.get("app/quiz/average");
        setaverge_quiz(averge_quiz.data.average);
        const flascard = await api.get("app/flashcards");
        setflashcards(flascard.data.length);
        const chat = await api.get("app/chat");
        setchats(chat.data.length);
        setloading(false);
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-700">

    </div>
  
  );
};

export default Page;
