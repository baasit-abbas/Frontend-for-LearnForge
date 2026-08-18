"use client"
import React, { useState } from "react";
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

const Delete = (props) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)
  const handleSubmit = () => {
    setloading(true)
    try{
        api.delete(`app/student/${props.id}`)
        let students = []
        if (props.getter.students){
          students = props.getter.students.filter(std => std.id != props.id)
        }
        else{
          students = props.getter.filter(std => std.id != props.id)
        }
        
        props.setter(students)
        toast.add({"title":"Deleted Student's data Successfully"})
        setloading(false)
        setopen(false)
    }
    catch(error){
        console.log(error.response.data)
        for (const field in error.response.data){
            toast.add({title:error.response.data[field]})
        }
        setloading(false)
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <CardBtn icon={<MdDelete size={20} />} text="Delete Student" />
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this user
          </DialogDescription>
        </DialogHeader>
        <button
        disabled={loading}
          onClick={handleSubmit}
          className="w-full h-10 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center"
        >
          {loading ? <Spinner className='h-5 w-5' /> : "Delete"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
