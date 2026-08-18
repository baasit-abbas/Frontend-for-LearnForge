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

const AddAdmin = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (password != confirm) {
        setloading(false)
      toast.add({ title: "Passwords do not match." });
      return;
    }
    const data = {
      username,
      email,
      password
    };
    try {
      await api.post("app/user", data);
      toast.add({ title: "Added Admin Successfully." });
    } catch (error) {
      console.log(error);
      toast.add({ title: "Unable to add Admin." });
    } finally {
      setopen(false);
      setloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger className='bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer text-gray-100 font-bold text-md rounded-full px-3 py-2'>
          Add Admin
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100 select-none w-100">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-gray-100 text-center">
            Add Admin
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
            
              <button disabled={loading} className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all duration-300 cursor-pointer text-lg mt-3 flex items-center justify-center">
                {loading ? <Spinner className='w-10 h-10' />: <p>Submit</p>}
              </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdmin;
