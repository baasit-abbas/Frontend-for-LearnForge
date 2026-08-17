"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardBtn from "./CardBtn";
import { MdDelete } from "react-icons/md";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { Spinner } from "./ui/spinner";

const DeleteCourse = (props) => {
  const [open, setopen] = useState(false)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    
  }, [])
  
    const handleSubmit = async () => {
      setloading(true)
        try{
            await api.delete(`app/course/${props.id}`)
            let new_courses = []
            if (props.getter.courses){
                new_courses = {...props.getter}
                new_courses.courses = new_courses.courses.filter(course => course.id != props.id)
            }
            else{
                new_courses = props.getter.filter(course => course.id != props.id)
            }
            props.setter(new_courses)
            toast.add({'title':"Deleted Course Succssfully"})
            setopen(false)
        } 
        catch(error){
            console.log(error.response.data)
            for (const field in error.response.data){
                toast.add({"title":`${field} : ${error.response.data[field]}`})
            }
        }
        finally{
          setloading(false)
        }
    }
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <CardBtn text="Delete" icon={<MdDelete size={20} />} />
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            course.
          </DialogDescription>
        </DialogHeader>
        <button onClick={handleSubmit} className="bg-red-600 hover:bg-red-500 transition-all duration-300 w-full py-2 text-lg select-none rounded-full cursor-pointer flex items-center justify-center">
          {loading ? <Spinner className='h-5 w-5' /> : "Delete"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCourse;
