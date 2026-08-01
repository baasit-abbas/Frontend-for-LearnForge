"use client";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const DisplayCard = (props) => {
  return (
    <div className="card flex flex-col justify-center p-3 bg-slate-700 text-gray-100 gap-6 w-70 h-50">
      <div className="flex gap-5 items-center">
        {props.icon}
        <h1>Total {props.name}</h1>
      </div>
      <h1 className="text-3xl">{props.count}</h1>
      <div className="flex gap-2 items-center">
        <p className="text-cyan-600 text-sm">{props.average}% +</p>
        <p className="text-lg flex gap-2 items-center">
          <FaLongArrowAltRight className="text-gray-100" size={10} />{" "}
          {props.month} This Month
        </p>
      </div>
    </div>
  );
};

export default DisplayCard;
