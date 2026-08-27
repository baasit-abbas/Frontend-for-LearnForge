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
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { MdChangeCircle } from "react-icons/md";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

const ChangePassword = () => {
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");

  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const handleChange = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const data = { old_password, new_password };
      await api.post("app/change_password", data);
      setopen(false);
      toast.add({ title: "Updated Password Successfully" });
    } catch (error) {
        console.log(error)
      toast.add({ title: error.response.data.detail });
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger className="transition-all duration-300 cursor-pointer hover:bg-slate-600 p-2 rounded-md flex items-center gap-4 text-lg outline-none">
        <MdChangeCircle size={25} />
        <p>Change Password</p>
      </DialogTrigger>
      <DialogContent className="w-90 bg-slate-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-center'>Change Password</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="w-full flex flex-col gap-3" onSubmit={handleChange}>
          <Field className="flex flex-col gap-2">
            <FieldLabel className="text-lg font-bold" htmlFor="old">
              Old Password:
            </FieldLabel>
            <Input
              id="old"
              onChange={(e) => setold_password(e.target.value)}
              value={old_password}
              placefolder="Enter old Password"
            />
          </Field>
          <Field className="flex flex-col gap-2">
            <FieldLabel className="text-lg font-bold" htmlFor="new">New Password:</FieldLabel>
            <Input
              id="new"
              onChange={(e) => setnew_password(e.target.value)}
              value={new_password}
              placefolder="Enter New Password"
            />
          </Field>
          <button
            type="Submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <Spinner className='h-7 w-7' />
            ) : (
              <div className="flex items-center gap-3">
                <MdChangeCircle size={25} />
                <p>Change Password</p>
              </div>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
