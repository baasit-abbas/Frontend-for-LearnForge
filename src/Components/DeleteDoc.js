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
import { MdDelete } from "react-icons/md";
import api from "@/utils/authClient";
import { toast } from "./ui/toast";
import { Tooltip, TooltipContent , TooltipTrigger } from "./ui/tooltip";
import { Spinner } from "./ui/spinner";

const DeleteDoc = (props) => {
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true)
    try {
      await api.delete(`app/docs/${props.id}`);
      let new_docs = [];
      if (props.getter.docs) {
        new_docs = { ...props.getter };
        new_docs.docs = new_docs.docs.filter((doc) => doc.id != props.id);
      } else {
        new_docs = props.getter.filter((doc) => doc.id != props.id);
      }
      props.setter(new_docs);
      toast.add({ title: "Deleted Document Succssfully" });
      setopen(false)
    } catch (error) {
      console.log(error.response.data);
      for (const field in error.response.data) {
        console.log(error)
        toast.add({ title: `${field} : ${error.response.data[field]}` });
      }
    }
    finally{
      setloading(false)
    }
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger className="px-3 py-2 cursor-pointer rounded-xl bg-slate-700  hover:bg-slate-800 transition-all duration-300">
            <MdDelete size={20} />
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800 text-gray-100 py-2 font-bold">
            Delete Document
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            document.
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-500 transition-all duration-300 w-full py-2 text-lg select-none rounded-full cursor-pointer flex items-center justify-center"
        >
          {loading ? <Spinner className='h-5 w-5' /> : "Delete"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDoc;
