"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { WrapperContext } from "./Wrapper";

const AddCourseAdmin = () => {
  const [title, settitle] = useState("");
  const [description, setemail] = useState("");
  const [Instructor, setInstructor] = useState({ id: "", username: "" });
  const [usernames, setusernames] = useState([]);
  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await api.get("app/instructors");
      setusernames(
        data.data.map((inst) => ({ id: inst.id, username: inst.username })),
      );
    };
    fetchInstructors();
  }, []);

  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const { toggleTheme } = useContext(WrapperContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      title,
      description,
      id: Instructor.id,
    };
    try {
      await api.post("app/course", data);
      toast.add({ title: "Added Course Sucessfully" });
    } catch (error) {
      console.log(error.respone.data);
      for (const field in error.respone.data) {
        toast.add({ title: error.respone.data[field] });
      }
    }
    setopen(false);
    setloading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger
        className={`${toggleTheme ? "bg-slate-100 hover:bg-slate-50 text-slate-800" : "bg-slate-700 hover:bg-slate-600 text-gray-100"}  transition-all duration-300 cursor-pointer  font-bold text-md rounded-md px-3 py-2`}
      >
        Add Course
      </DialogTrigger>
      <DialogContent
        className={`${toggleTheme ? "bg-gray-100 text-slate-800" : "bg-slate-700 text-gray-100"} select-none w-100`}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Add Course</DialogTitle>
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
              className="py-2 px-4 rounded-xl w-full"
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
              className="py-2 px-4 rounded-xl  w-full"
              onChange={(e) => setemail(e.target.value)}
              type="text"
              value={description}
              required
            />
          </Field>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-xl font-bold">Instructor:</h1>
            <Combobox
              items={usernames}
              value={Instructor.username}
              onValueChange={(value) => setInstructor(value)}
            >
              <ComboboxInput
                className={`${toggleTheme ? "bg-slate-100" : "bg-slate-700"}`}
                placeholder={"Select Instructor"}
              />
              <ComboboxContent
                className={`${toggleTheme ? "text-slate-700" : "text-slate-100"} w-full`}
              >
                <ComboboxEmpty>No Instructor found.</ComboboxEmpty>
                <ComboboxList
                  className={`${toggleTheme ? "bg-slate-100" : "bg-slate-700"}`}
                >
                  {(item) => (
                    <ComboboxItem
                      className={`w-full ${toggleTheme ? "hover:bg-slate-50" : "hover:bg-slate-600"} cursor-pointer`}
                      key={item.id}
                      value={item}
                    >
                      {item.username}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <button
            type="submit"
            className={`${toggleTheme ? "bg-gray-300 hover:bg-gray-200 text-slate-800" : "bg-slate-800 hover:bg-slate-600 text-gray-100"} transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Add Course"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseAdmin;
