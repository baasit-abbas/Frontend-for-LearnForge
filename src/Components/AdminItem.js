"use client";
import React from "react";

const AdminItem = (props) => {
  return (
    <div className="flex justify-between">
      <p>{props.text}</p>
      <p>{props.average}</p>
    </div>
  );
};

export default AdminItem;
