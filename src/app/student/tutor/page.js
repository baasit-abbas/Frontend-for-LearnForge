"use client";
import { TutorContext } from "@/Components/TutorProvider";
import { Input } from "@/Components/ui/input";
import { useSidebar } from "@/Components/ui/sidebar";
import { toast } from "@/Components/ui/toast";
import { WrapperContext } from "@/Components/Wrapper";
import api from "@/utils/authClient";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const Page = () => {
  const [question, setquestion] = useState("");
  const { chats, setchats, id, setid, conversation, setconversation , selected , setselected } =
    useContext(TutorContext);
  const {open , isMobile , openMobile} = useSidebar()
  const [loading, setloading] = useState(false);
  const {toggleTheme} = useContext(WrapperContext)
  const bottomRef = useRef()
  useEffect(() => {
    if (bottomRef.current){
      bottomRef.current.scrollIntoView({"behavior":"smooth"})
    }
  }, [conversation])
  
  const handleAnswer = async (e) => {
    e.preventDefault();
    if (loading){
      return
    }
    if (!question) {
      toast.add({ title: "Please ask some question" });
    }
    setquestion("");
    const human_message = question;
    let newconverstion = [
      ...conversation,
      { id: "abc", message: human_message, role: "human" },
    ];
    setconversation(newconverstion);
    let response = {};
    setloading(true);
    if (!id) {
      setid("abc");
      try {
        response = await api.post("app/chat", { question: human_message });
      } catch (error) {
        toast.add({ title: "Error while generating answer. Try again." });
        newconverstion = newconverstion.filter(convo => convo.id != "abc")
        setconversation(newconverstion)
        setloading(false)
        return;
      }
      const new_chats = [
        {
          id: response.data.id,
          title: response.data.title,
          created_at: response.data.created_at,
          user: response.data.user,
        },
        ...chats,
      ];
      setchats(new_chats);
      setid(response.data.id);
      setselected(response.data.id)

    } else {
      try {
        response = await api.post(`app/chat/${id}`, { question });
      } catch (error) {
        toast.add({ title: "Error while generating answer. Try again." });
        setloading(false)
        return;
      }
    }
    setloading(false);
    newconverstion[newconverstion.length - 1] = { ...response.data.human };
    newconverstion = [...newconverstion, { ...response.data.ai }];
    setconversation(newconverstion);
  };
  return (
    <div className="md:p-20 px-5 py-15 min-h-screen flex justify-center w-full">
      <div className="md:w-[80%] w-full">
        {!id && (
          <h1 className={`md:text-2xl text-xl fixed ${!isMobile ? open ? "left-110":"left-95":"left-5 right-5"} md:right-40 top-[33%] translate-y-[-50%] transition-all duration-500`}>
            Ask me anything about your course, and I&apos;ll help you understand
            it step by step.
          </h1>
        )}

        <form
          className={` fixed ${!isMobile ? open ? "left-110":"left-50":"left-5 right-5"} md:right-40 ${id ? "bottom-5" : "top-[40%]"} transition-all duration-500`}
          onSubmit={handleAnswer}
        >
          <Input
            type="text"
            onChange={(e) => setquestion(e.target.value)}
            className={`w-full rounded-full py-6 px-3 pr-20 z-50 ${toggleTheme ? "bg-slate-200":"bg-slate-800"}`}
            placeholder="Ask Anything about your courses"
            value={question}
          />
          <button
            type="submit"
            className={`p-2 rounded-full ${toggleTheme ? "bg-slate-300 hover:bg-slate-200":"bg-slate-900 hover:bg-slate-800 "} transition-all duration-300 absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer`}
          >
            <IoSend size={20} />
          </button>
        </form>
        {id && (
          <div className="flex flex-col gap-3 w-full">
            {conversation?.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`${message.role == "human" ? toggleTheme ? "bg-slate-300 max-w-[55%] self-end":"bg-slate-800 max-w-[55%] self-end" : "max-w-full self-start"} py-3 px-2 rounded-full `}
                >
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                </div>
              );
            })}
            {loading && (
              <div className="w-3 h-3 rounded-full bg-slate-800 dot-scale self-start"></div>
            )}
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default Page;
