"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

import DeleteBtn from "./DeleteBtn";
import { WrapperContext } from "./Wrapper";

const Delete = (props) => {
  const [open, setopen] = useState(false);
  const {toggleTheme} = useContext(WrapperContext)

  const handleDelete = () => {
    props.func(props.id);
    setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DeleteBtn setopen={setopen} />
      <DialogContent className={`${toggleTheme ? "bg-slate-100 text-slate-800":"bg-slate-800 text-gray-100"} w-100`}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete user.
          </DialogDescription>
          <button
            onClick={handleDelete}
            className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-500 font-bold text-lg cursor-pointer text-white"
          >
            Delete
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
