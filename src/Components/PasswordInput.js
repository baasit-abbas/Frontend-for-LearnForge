"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Input } from "./ui/input";
import { Field, FieldLabel } from "./ui/field";

const PasswordInput = (props) => {
  const [show, setshow] = useState(false);

  return (
    <Field className="flex flex-col gap-2 w-full">
      <FieldLabel htmlFor={props.text}>
        {props.text}:
      </FieldLabel>
      <div className="w-full relative">
        <Input
          onChange={(e) => props.setter(e.target.value)}
          value={props.getter}
          className="w-full py-2 px-3 placeholder:text-gray-500 text-gray-100 border-2 border-slate-700 active:border-slate-800 outline-none rounded-xl pr-10"
          type={show ? "text" : "password"}
          id={props.text}
          placeholder={props.placeholder}
          required
        />
        <div
          onClick={() => setshow(!show)}
          className="absolute top-1/2 translate-y-[-50%] right-2 text-slate-400"
        >
          {show ? (
            <FaEyeSlash className="hover:text-gray-100 transition-all duration-300 cursor-pointer" size={20} />
          ) : (
            <FaEye className=" hover:text-gray-100 transition-all duration-300 cursor-pointer" size={20} />
          )}
        </div>
      </div>
    </Field>
  );
};

export default PasswordInput;
