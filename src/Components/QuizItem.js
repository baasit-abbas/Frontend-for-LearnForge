import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { QuizContext } from "./QuizProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QuizItem = (props) => {
  const [title, settitle] = useState(props.title);
  const inputRef = useRef();
  const { quizes, setquizes } = useContext(QuizContext);
  const router = useRouter()
  useEffect(() => {
    if (props.isEdit == props.id && inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [props.isEdit]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`app/quiz/${props.id}`, { title });
      const new_quizes = [...quizes];
      const idx = new_quizes.findIndex((quiz) => quiz.id == props.id);
      new_quizes[idx].title = title;
      setquizes(new_quizes);
      props.setisEdit("");
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title: `${field} : ${error.response.data[field]}` });
      }
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      await api.delete(`app/quiz/${props.id}`);
      const new_quizes = quizes.filter((quiz) => quiz.id != props.id);
      if (props.selected == props.id){
        props.setselected("")
        props.setquiz("")
        router.push('/student/quiz')
      }
      setquizes(new_quizes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleEdit}
        onClick={() => router.push(`/student/quiz/${props.id}`)}
        className="h-12 w-full relative"
        key={props.id}
      >
        <Input
          ref={inputRef}
          onClick={() =>
            props.isEdit != props.id && props.setselected(props.id)
          }
          onBlur={handleEdit}
          onChange={(e) => settitle(e.target.value)}
          className={`w-full h-full ${props.isEdit == props.id ? "cursor-text border-2" : props.selected == props.id ? "cursor-pointer bg-slate-800" : "cursor-pointer bg-slate-600 hover:bg-slate-500"} transition-all duration-300 pr-10 border-none outline-none p-3 rounded-md`}
          value={title}
          readOnly={props.isEdit != props.id}
        />
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="absolute top-[50%] translate-y-[-50%] right-2 p-2 hover:bg-slate-500 rounded-full  cursor-pointer">
            <BsThreeDots size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 text-gray-100">
            <DropdownMenuGroup>
              <DropdownMenuLabel></DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  props.setisEdit(props.id);
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
    
    </>
  );
};

export default QuizItem;
