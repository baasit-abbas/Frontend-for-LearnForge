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

import { MdDelete } from "react-icons/md";

const Delete = (props) => {

    const [open, setopen] = useState(false)

    const handleDelete = () => {
        props.func(props.id)
        setopen(false)
    }

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger aschild={true}>
        <button className="px-2 py-1 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-300 cursor-pointer text-gray-100">
          <MdDelete size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className='bg-slate-800 text-gray-100'>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete user.
          </DialogDescription>
          <button onClick={handleDelete} className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-500 font-bold text-lg cursor-pointer">Delete</button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
