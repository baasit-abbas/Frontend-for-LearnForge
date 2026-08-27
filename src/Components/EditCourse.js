"us client";
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
import { FaEdit } from "react-icons/fa";
import api from "@/utils/authClient";
import { Field, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import { Input } from "./ui/input";
import { toast } from "./ui/toast";
import { TooltipTrigger } from "./ui/tooltip";

const EditCourse = (props) => {
  const [title, settitle] = useState(props.title);
  const [description, setdescription] = useState(props.description);
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const data = { title, description };
      await api.patch(`app/course/${props.id}`, data);
      let new_courses = []
      if (props.getter.courses) {
        new_courses = { ...props.getter };
        const idx = new_courses.courses.findIndex(
          (course) => course.id == props.id,
        );
        new_courses.courses[idx] = { ...new_courses.courses[idx], ...data };
      } else {
        new_courses = [...props.getter];
        const idx = new_courses.findIndex((course) => course.id == props.id);
        new_courses[idx] = { ...new_courses[idx], ...data };
      }
      setloading(false);
      setopen(false);
      props.setter(new_courses);
      toast.add({ title: "Updated Course Data Successfully" });
    } catch (error) {
      console.log(error);
      setloading(false);
      for (const field in error.response.data) {
        toast.add({ title: `${field} : ${error.response.data[field]}` });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <CardBtn text="Edit" icon={<FaEdit size={20} />} />
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Edit Course
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Field className="flex flex-col gap-3">
              <FieldLabel className="text-lg" htmlFor="title">
                Title:
              </FieldLabel>
              <Input
                id="title"
                className="w-full py-3"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </Field>
            <Field className="flex flex-col">
              <FieldLabel className="text-lg" htmlFor="description">
                Description:
              </FieldLabel>
              <Input
                id="description"
                className="w-full py-3"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Field>
            <button
    
              disabled={loading}
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 transition-all duration-300 font-bold text-lg flex items-center justify-center cursor-pointer rounded-md"
            >
              {loading ? <Spinner className="w-10 h-10" /> : "Edit"}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
