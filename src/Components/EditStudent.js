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
import CardBtn from "./CardBtn";
import { FaEdit } from "react-icons/fa";
import { Spinner } from "./ui/spinner";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";

const EditStudent = (props) => {
  const [username, setusername] = useState(props.username);
  const [email, setemail] = useState(props.email);
  const [dob, setdob] = useState(props.dob);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, email, date_of_birth: dob };
    setloading(true);
    let new_stds = []
    try {
      await api.patch(`app/student/${props.id}`, data);
      if (props.getter.students) {
        new_stds = {...props.getter};
        const idx = new_stds.students.findIndex((std) => std.id == props.id);
        new_stds.students[idx] = { ...new_stds.students[idx], ...data };
      } else {
        new_stds = [...props.getter];
        const idx = new_stds.findIndex((std) => std.id == props.id);
        new_stds[idx] = { ...new_stds[idx], ...data };
      }
      props.setter(new_stds);
      toast.add({ title: "Updated Student's data Successfully" });
      setloading(false);
      setopen(false);
    } catch (error) {
      console.log(error.response.data);
      for (const field in error.response.data) {
        toast.add({ title: error.response.data[field] });
      }
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <CardBtn icon={<FaEdit size={20} />} text="Edit Student" />
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-center">
            Edit Student
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center  rounded-md w-full p-1"
        >
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="username">
              Username:
            </FieldLabel>
            <Input
              id="username"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => setusername(e.target.value)}
              type="text"
              value={username}
              required
            />
          </Field>
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="email">
              Eamil:
            </FieldLabel>
            <Input
              id="email"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => setemail(e.target.value)}
              type="text"
              value={email}
              required
            />
          </Field>
          <Field className="flex flex-col gap-2 w-full text-xl">
            <FieldLabel className="font-bold" htmlFor="dob">
              Date Of Birth:
            </FieldLabel>
            <Input
              id="dob"
              className="py-2 px-4 rounded-xl bg-slate-600 border-2 border-slate-500 outline-none active:border-slate-700 w-full"
              onChange={(e) => setdob(e.target.value)}
              type="date"
              value={dob}
              required
            />
          </Field>
          <button
          disabled={loading}
            type="submit"
            className="text-gray-100 bg-slate-600 hover:bg-slate-500 transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold flex items-center justify-center"
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Edit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudent;
