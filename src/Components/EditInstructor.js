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
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";

const EditInstructor = (props) => {
  const [username, setusername] = useState(props.username);
  const [email, setemail] = useState(props.email);
  const [specialization, setspecialization] = useState(props.specialization);
  const [experience_years, setexperience_years] = useState(
    props.experience_years,
  );
  const [open, setopen] = useState(false)
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {username,email,specialization,experience_years}
    console.log(data)
    setloading(true)
    try{
        const new_inst = await api.patch(`app/instructor/${props.id}`,data)
        const instructors = [...props.getter]
        const idx = instructors.findIndex(inst => inst.id == props.id)
        instructors[idx] = new_inst.data
        props.setter(instructors)
        toast.add({title:"Updated Instructor's data Successfully"})
        setloading(false)
        setopen(false)
    }
    catch(error){
        console.log(error)
        for (const field in error.response.data){
            toast.add({title:error.response.data[field]})
        }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <CardBtn icon={<FaEdit size={20} />} text="Edit" />
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 w-100">
        <DialogHeader>
          <DialogTitle className='text-center text-xl'>Edit Instructor</DialogTitle>
          <DialogDescription></DialogDescription>
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <Field className="flex flex-col gap-3">
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                onChange={(e) => setusername(e.target.value)}
                value={username}
                required
              />
            </Field>
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                required
              />
            </Field>
            <Field className="flex flex-col gap-3">
              <FieldLabel htmlFor="specialization">Specialization</FieldLabel>
              <Input
                id="specialization"
                onChange={(e) => setspecialization(e.target.value)}
                value={specialization}
                required
              />
            </Field>
            <Field className="flex flex-col gap-3">
              <FieldLabel htmlFor="experience_years">
                Experience Years
              </FieldLabel>
              <Input
                id="experience_years"
                onChange={(e) => setexperience_years(e.target.value)}
                value={experience_years}
                type="number"
                required
              />
            </Field>
            <button className="w-full rounded-xl bg-slate-600 transition-all duration-300 hover:bg-slate-500 cursor-pointer outline-none flex items-center justify-center py-3 font-bold text-lg" disabled={loading}>
              {loading ? (
                <Spinner className="w-10 h-10" />
              ) : (
                "Update Instructor"
              )}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstructor;
