"use client";
import AdminPageHeader from "@/Components/AdminPageHeader";
import AdminVideoCard from "@/Components/AdminVideoCard";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [text, settext] = useState("");
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get("app/videos");
      setvideos(data.data);
    };
    fetchData();
  }, []);

  const handleSerch = () => {
    if (text == "") {
      return videos;
    }
    return videos.filter(
      (video) =>
        video.title.toLowerCase().startsWith(text.toLocaleLowerCase()) ||
        video.instructor.toLowerCase().startsWith(text.toLocaleLowerCase()) ||
        video.course_name.toLowerCase().startsWith(text.toLocaleLowerCase()),
    );
  };

  return (
    <div className="flex flex-col px-15 py-5 gap-10">
      <AdminPageHeader
        heading="Videos"
        placeholder="Search by title , instructor Name and Course name."
        search={settext}
      />
      <div className="flex flex-wrap gap-8">
        {handleSerch().map((video) => {
          return (
            <AdminVideoCard
              key={video.id}
              id={video.id}
              course_name={video.course_name}
              instructor={video.instructor}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
              created_at={video.created_at}
              getter={videos}
              setter={setvideos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
