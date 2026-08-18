"use client";
import AdminDocCard from "@/Components/AdminDocCard";
import AdminPageHeader from "@/Components/AdminPageHeader";
import api from "@/utils/authClient";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [text, settext] = useState("");
  const [title, settitle] = useState("");
  const [docs, setdocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get("app/docs");
      setdocs(data.data);
      settitle(data.data.title);
    };
    fetchData();
  }, []);

  const handleSerch = () => {
    if (text == "") {
      return docs;
    }
    return docs.filter(
      (doc) =>
        doc.title.toLowerCase().startsWith(text.toLowerCase()) ||
        doc.instructor.toLowerCase().startsWith(text.toLowerCase()) ||
        doc.course_name.toLowerCase().startsWith(text.toLowerCase()),
    );
  };

  return (
    <div className="flex flex-col px-15 py-5 gap-10">
      <AdminPageHeader
        heading="Documents"
        placeholder="Search by title , instructor Name and Course name."
        search={settext}
      />
      <div className="flex flex-wrap justify-between gap-4">
        {handleSerch().map((doc) => {
          return (
            <AdminDocCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              fileType={doc.fileType}
              fileUrl={doc.fileUrl}
              course={doc.course_name}
              instructor={doc.instructor}
              getter={docs}
              setter={setdocs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
