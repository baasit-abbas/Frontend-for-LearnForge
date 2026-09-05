"use client";
import { Input } from "@/Components/ui/input";
import { useSidebar } from "@/Components/ui/sidebar";
import { toast } from "@/Components/ui/toast";
import api from "@/utils/authClient";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const Page = () => {
  const params = useParams();
  const [question, setquestion] = useState("");
  const [chat, setchat] = useState([]);
  const [loading, setloading] = useState(false);
  const {open} = useSidebar()
  const [id, setid] = useState()
  const bottomRef = useRef()
  useEffect(() => {
    const loadData = async () => {
      const id = params.id;
      setid(id)
      const all_data = await api.get(`app/chat/${id}`);
      setchat(all_data.data.messages);
    };
    loadData();
  }, []);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({behavior:"smooth"})
  }, [chat])
  

  const handleAnswer = async (e) => {
    e.preventDefault()
    if (loading){
      return
    }
    if (!question) {
      toast.add({ title: "Please ask some question" });
    }
    setquestion("");
    const human_message = question;
    let newchat = [
      ...chat,
      { id: "abc", message: human_message, role: "human" },
    ];
    setchat(newchat);
    setloading(true)
    let response = ''
    try{
      response = await api.post(`/app/chat/${id}`,{question:human_message})
    }
    catch(error){
      console.log(error)
      toast.add({title:"Error while generating answer.Please try again."})
      setloading(false)
    }
    
    setloading(false);
    newchat[newchat.length - 1] = { ...response.data.human };
    newchat = [
      ...newchat,
      { ...response.data.ai },
    ];
    setchat(newchat);
  }

  return (
    <div className="p-20 flex justify-center w-full">
      <div className="w-[80%] flex flex-col gap-3">
        <form
          className={`fixed ${open ? "left-110":"left-50"} right-40  bottom-5 transition-all duration-500 `}
          onSubmit={handleAnswer}
        >
          <Input
            type="text"
            onChange={(e) => setquestion(e.target.value)}
            className="w-full rounded-full py-6 px-3 pr-20 z-50 bg-slate-800"
            placeholder="Ask Anything about your courses"
            value={question}
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-all duration-300 absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer"
          >
            <IoSend size={20} />
          </button>
        </form>
        {chat?.map((message) => {
          return (
            <div
              key={message.id}
              className={`${message.role == "human" ? "self-end rounded-full bg-slate-800 max-w-[55%]" : "max-w-full self-start"}  py-3 px-2`}
            >
              <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
          );
        })}
        {loading && (
          <div className="w-3 h-3 dot-scale rounded-full bg-slate-800"></div>
        )}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default Page;
