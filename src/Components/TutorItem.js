"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import api from "@/utils/authClient";
import { TutorContext } from "./TutorProvider";
import { toast } from "./ui/toast";

const TutorItem = (props) => {
  const [title, settitle] = useState(props.title);
  const { chats, setchats } = useContext(TutorContext);
  const inputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (props.isEdit == props.id && inputRef.current){
      inputRef.current?.focus()
    }
  }, [props.isEdit])
  

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`app/chat/${props.id}`, { title });
      let newChats = [...chats];
      const idx = newChats.findIndex((chat) => chat.id == props.id);
      newChats[idx].title = title;
      setchats(newChats);
      props.setisEdit("")
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title: `${field} : ${error.response.data[field]}` });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`app/chat/${props.id}`);
      let newChats = chats.filter((chat) => chat.id != props.id);
      setchats(newChats);
      toast.add({ title: "Deleted Chat Successfully" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleEdit} className={`w-full h-12 relative`}>
      <Input
        ref={inputRef}
        onBlur={handleEdit}
        onClick={() => {
          props.isEdit != props.id &&
            (props.setselected(props.id),
            router.push(`/student/tutor/${props.id}`));
        }}
        className={`w-full h-full ${props.isEdit == props.id ? "border-2 cursor-text" : props.selected == props.id ? "bg-slate-800 " : "bg-slate-600 hover:bg-slate-500 "} text-slate-100 transition-all duration-300 p-3 rounded-md text-md cursor-pointer border-none outline-none pr-15`}
        value={title}
        onChange={(e) => settitle(e.target.value)}
        readOnly={props.isEdit != props.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-[50%] translate-y-[-50%] right-2 p-2 hover:bg-slate-500 rounded-full  cursor-pointer">
          <BsThreeDots size={15} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800 text-gray-100">
          <DropdownMenuGroup>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                (props.setisEdit(props.id));
              }}
              className="hover:bg-slate-700 transition-all duration-300 cursor-pointer flex items-center gap-3 px-2 text-lg"
            >
              <FaEdit size={20} />
              <p>Rename</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleDelete}
              className="hover:bg-red-300/35 text-red-400 transition-all duration-300 cursor-pointer flex items-center px-2 text-lg"
            >
              <MdDelete size={20} />
              <p>Delete</p>
            </DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
};

export default TutorItem;
