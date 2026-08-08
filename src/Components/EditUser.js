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

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { FaEdit } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";
import { Spinner } from "./ui/spinner";
import EditBtn from "./EditBtn";

const EditUser = (props) => {
  const [username, setusername] = useState(props.username);
  const [email, setemail] = useState(props.email);
  const [role, setrole] = useState(props.role);
  const roles = ["Admin", "Instructor", "Student"];
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      username,
      email,
      role,
    };
    setopen(false);
    props.func(props.id, data);
    setloading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <EditBtn />
      <DialogContent className="bg-slate-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-100 text-center text-2xl">
            Edit User
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleEdit}
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
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-xl font-bold">Role:</h1>
            <Combobox
              className="bg-slate-600"
              items={roles}
              value={role}
              onValueChange={(value) => setrole(value)}
            >
              <ComboboxInput placeholder={role} />
              <ComboboxContent className="w-full text-gray-100">
                <ComboboxEmpty>No Role found.</ComboboxEmpty>
                <ComboboxList className="bg-slate-700">
                  {(item) => (
                    <ComboboxItem
                      className="w-full hover:bg-slate-500 cursor-pointer"
                      key={item}
                      value={item}
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <button
            type="submit"
            className="text-gray-100 bg-slate-600 hover:bg-slate-500 transition-all duration-300 w-full py-3 cursor-pointer text-xl rounded-xl font-bold"
          >
            {loading ? <Spinner className="w-10 h-10" /> : "Edit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
