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
import PasswordInput from "./PasswordInput";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { FieldLabel } from "./ui/field";
import { toast } from "./ui/toast";
import api from "@/utils/authClient";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { Spinner } from "./ui/spinner";

const AddInstructor = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [specialization, setspecialization] = useState("");
  const [experience_years, setexperience_years] = useState("");
  const [phone, setphone] = useState("");
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (password != confirm) {
      toast.add({ title: "Passwords do not match." });
      return;
    }
    const data = {
      username,
      email,
      password,
      specialization,
      experience_years,
      phone: "+92 " + phone,
    };
    try {
      await api.post("app/instructor", data);
      toast.add({ title: "Added Instructor Successfully." });
      setusername('')
      setemail('')
      setpassword('')
      setconfirm('')
      setspecialization('')
      setexperience_years('')
      setphone('')
      setopen(false);
      setloading(false);
    } catch (error) {
      console.log(error.response.data);
      for (const field in error.response.data){
        toast.add({ title: error.response.data[field] });
      setloading(false);
      return
      } 
    } 
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger className='bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer text-gray-100 font-bold text-md rounded-full px-3 py-2'>
          Add Instructor
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 select-none w-100">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-gray-100 text-center">
            Add Instructor
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <form
            className="flex flex-col gap-1 w-full px-2 text-gray-100"
            onSubmit={handleSubmit}
          >
            <Field className="flex flex-col gap-2 w-full">
              <FieldLabel htmlFor="username">Username:</FieldLabel>
              <Input
                onChange={(e) => setusername(e.target.value)}
                value={username}
                className="w-full py-2 px-3 placeholder:text-gray-500 text-gray-100 border-2 border-slate-700 active:border-slate-800 outline-none rounded-xl"
                type="text"
                id="username"
                placeholder="Enter Username"
                required
              />
            </Field>
            <Field className="flex flex-col gap-2 w-full">
              <FieldLabel htmlFor="email">Email:</FieldLabel>
              <Input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="w-full py-2 px-3 placeholder:text-gray-500 text-gray-100 border-2 border-slate-700 active:border-slate-800 outline-none rounded-xl"
                type="email"
                id="email"
                placeholder="Enter Email"
                required
              />
            </Field>
            <PasswordInput
              text="Password"
              placeholder="Enter Password"
              setter={setpassword}
              getter={password}
            />
            <PasswordInput
              text="Confirm"
              placeholder="Again Enter Password"
              setter={setconfirm}
              getter={confirm}
            />
            <Field className="flex flex-col gap-2 w-full">
              <FieldLabel htmlFor="specialization">Specialization:</FieldLabel>
              <Input
                onChange={(e) => setspecialization(e.target.value)}
                value={specialization}
                className="w-full py-2 px-3"
                type="text"
                id="specialization"
                placeholder="Enter Specialization"
                required
              />
            </Field>
            <Field className="flex flex-col gap-2 w-full">
              <FieldLabel htmlFor="experience">Experience Years:</FieldLabel>
              <Input
                onChange={(e) => setexperience_years(Number(e.target.value))}
                value={experience_years}
                className="w-full py-2 px-3"
                id="experience"
                type="number"
                placeholder="Enter experience years"
                required
              />
            </Field>
            <Field className="flex flex-col gap-2 w-full">
              <FieldLabel htmlFor="experience">Phone Number:</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  onChange={(e) => setphone(e.target.value)}
                  value={phone}
                  className="w-full py-2 px-3"
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  required
                />
                <InputGroupAddon>
                  <InputGroupText>+92</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
              <button disabled={loading} className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer text-lg mt-3 flex items-center justify-center">
                {loading ? <Spinner className='w-10 h-10' />: <p>Submit</p>}
              </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddInstructor;
