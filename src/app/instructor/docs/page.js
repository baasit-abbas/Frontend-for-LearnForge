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

  const handleSearch = () => {
    if (text == "") {
      return docs;
    }
    const lower_text = text.toLocaleLowerCase()
    return docs.filter(
      (doc) =>
        doc.title.toLowerCase().startsWith(lower_text) ||
        doc.instructor.toLowerCase().startsWith(lower_text) ||
        doc.course_name.toLowerCase().startsWith(lower_text)
    );
  };

  return (
    <div className="flex flex-col px-15 py-5 gap-10">
      <AdminPageHeader
        heading="Documents"
        placeholder="Search by title , instructor Name and Course name."
        search={settext}
      />
      {handleSearch().length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">No Documents Found</h1>
        </div>
      )}
      <div className="flex flex-wrap justify-between gap-4">
        {handleSearch().map((doc) => {
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
