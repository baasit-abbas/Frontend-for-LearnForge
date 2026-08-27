"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";


const AddCourseInstructor = () => {
  const [title, settitle] = useState("");
  const [description, setemail] = useState("");
  
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      title,
      description,
    };
    try{
        await api.post('app/course',data)
        toast.add({"title":"Added Course Sucessfully"})
    }
    catch(error){
        console.log(error.respone.data)
        for (const field in error.respone.data){
            toast.add({"title": error.respone.data[field]})
        }
    }
    setopen(false);
    setloading(false);
  };


  return (
    <Dialog open={open} onOpenChange={setopen}>
    <DialogTrigger className='px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer'>
        Add Course
    </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100 text-center text-2xl">
            Add Course
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center  rounded-md w-full p-1"
        >
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="title">
              Title:
            </FieldLabel>
            <Input
              id="title"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => settitle(e.target.value)}
              type="text"
              value={title}
              required
            />
          </Field>
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="description">
              Description:
            </FieldLabel>
            <Input
              id="description"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => setemail(e.target.value)}
              type="text"
              value={description}
              required
            />
          </Field>
          <button
            type="submit"
            className="text-gray-100 bg-slate-600 hover:bg-slate-500 transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Add Course"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseInstructor;
