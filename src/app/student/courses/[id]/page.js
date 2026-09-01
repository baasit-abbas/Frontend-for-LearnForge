"use client";
import StudentDocCard from "@/Components/StudentDocCard";
import StudentVideoCard from "@/Components/StudentVideoCard";
import { Input } from "@/Components/ui/input";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [course, setcourse] = useState([]);
  const [selected, setselected] = useState("Documents");
  const [text, settext] = useState("");
  const [isFlipped, setisFlipped] = useState(false);
  const params = useParams();
  useEffect(() => {
    const loadData = async () => {
      const id = params.id;
      const course_data = await api.get(`app/course/${id}`);
      setcourse(course_data.data);
    };
    loadData();
  }, []);

  const handleSearch = () => {
    const lower_text = text.toLowerCase();
    if (selected == "Documents") {
      return course.docs?.docs.filter((doc) =>
        doc.title.toLowerCase().startsWith(lower_text),
      );
    } else if (selected == "Videos") {
      return course.videos?.videos.filter((video) =>
        video.title.toLowerCase().startsWith(lower_text),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-gray-100 px-10 py-5">
      <header className="bg-slate-700 flex justify-between items-center px-5 h-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{course?.title}</h1>
          <p>{course?.description}</p>
        </div>
        <div className="flex gap-3">
          <h1 className="text-xl font-bold uppercase tracking-[3]">
            Instructor:{" "}
          </h1>
          <p className="text-lg uppercase tracking-[5]">{course?.instructor}</p>
        </div>
      </header>
      <div className="flex items-center justify-around mt-5 w-full rounded-md bg-slate-700 h-10">
        <button
          onClick={() => setselected("Documents")}
          className={`font-bold px-3 py-2 cursor-pointer text-lg h-full ${selected == "Documents" ? "bg-slate-800" : "hover:bg-slate-600"}`}
        >
          Documents
        </button>
        <button
          onClick={() => setselected("Videos")}
          className={`font-bold px-3 py-2 cursor-pointer h-full text-lg ${selected == "Videos" ? "bg-slate-800" : "hover:bg-slate-600"}`}
        >
          Videos
        </button>
        <button
          onClick={() => setselected("Flashcards")}
          className={`font-bold px-3 py-2 h-full cursor-pointer text-lg ${selected == "Flashcards" ? "bg-slate-800" : "hover:bg-slate-600"}`}
        >
          Flashcards
        </button>
      </div>
      {selected !== "Flashcards" && (
        <div className="w-full h-10 mt-5">
          <Input
            className="w-full h-full"
            onChange={(e) => settext(e.target.value)}
            placeholder="Search by title"
          />
        </div>
      )}
      <div className="flex items-center gap-3 mt-5">
        {selected == "Documents" ? (
          <>
            <h1 className="text-xl font-bold">Progress in Documents :</h1>
            <p></p>
            {course.docs?.review?.completed} / {course.docs?.review?.total}
          </>
        ) : selected == "Videos" ? (
          <>
            <h1 className="text-xl font-bold">Progress in Videos :</h1>
            <p></p>
            {course.videos?.review?.completed} / {course.videos?.review?.total}
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">
              Progress in Flashcards in this course :
            </h1>
            <p></p>
            {course.flashcards?.review?.marks} /{" "}
            {course.flashcards?.review?.total_marks}
          </>
        )}
      </div>

      <div className="mt-10">
        {selected == "Documents" ? (
          <div className="flex flex-wrap gap-7">
            {course.docs && handleSearch().length == 0 && (
              <h1 className="text-5xl font-bold text-center">
                No Documents Found
              </h1>
            )}
            {course.docs &&
              handleSearch().map((doc) => {
                return (
                  <StudentDocCard
                    key={doc.id}
                    id={doc.id}
                    course={course.title}
                    instructor={course.instructor}
                    title={doc.title}
                    fileType={doc.fileType}
                    fileUrl={doc.fileUrl}
                    completed={doc.completed}
                    getter={course}
                    setter={setcourse}
                  />
                );
              })}
          </div>
        ) : selected == "Videos" ? (
          <div className="flex flex-wrap gap-7">
            {course.videos && handleSearch().length == 0 && (
              <h1 className="text-5xl font-bold text-center">
                No Videos Found
              </h1>
            )}
            {course.videos &&
              handleSearch().map((video) => {
                return (
                  <StudentVideoCard
                    key={video.id}
                    id={video.id}
                    course={video.title}
                    instructor={video.instructor}
                    title={video.title}
                    thumbnailUrl={video.thumbnailUrl}
                    videoUrl={video.videoUrl}
                    created_at={video.created_at}
                    getter={course}
                    setter={setcourse}
                  />
                );
              })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {course.flashcards && course.flashcards.flashcards?.length == 0 && (
              <h1 className="text-5xl font-bold text-center">
                No Flascards Due Today.
              </h1>
            )}
            {course.flashcards &&
              course.flashcards.flashcards?.map((flash) => {
                return (
                  <div
                    className="w-96 h-56 cursor-pointer text-slate-800"
                    key={flash.id}
                    onClick={() => setisFlipped(!isFlipped)}
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-500 transform-3d ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white p-6 backface-hidden">
                        <p className="text-xl font-semibold text-center">
                          {flash.front_text}
                        </p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-800 text-white p-6 backface-hidden rotate-y-180">
                        <p className="text-xl font-semibold text-center">
                          {flash.back_text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
