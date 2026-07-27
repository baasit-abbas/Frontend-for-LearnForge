import React from "react";

const Card = (props) => {
  return (
    <div className="card rounded-2xl bg-linear-to-r from-blue-900 to-purple-600 flex flex-col items-center justify-center gap-3 h-50 w-95 hover:-translate-y-2.5 transition-all duration-300">
      {props.icon}
      <h1 className="text-3xl font-bold">
        Total {props.name} : {props.var}
      </h1>
    </div>
  );
};

export default Card;
