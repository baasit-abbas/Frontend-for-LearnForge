"use client"
import React from 'react'
import { Tooltip , TooltipTrigger, TooltipContent  } from './ui/tooltip'
import { DialogTrigger } from './ui/dialog'
import { MdDelete } from 'react-icons/md'

const DeleteBtn = () => {
  return (
    <Tooltip>
        <TooltipTrigger>
          <DialogTrigger className="px-2 py-1 rounded-full bg-slate-500 hover:bg-slate-400 transition-all duration-300 cursor-pointer text-gray-100 outline-none border-none">
            <MdDelete size={20} />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="bg-slate-700 text-gray-100 px-3 py-2 rounded-md font-bold">
            Delete
          </p>
        </TooltipContent>
      </Tooltip>
  )
}

export default DeleteBtn
