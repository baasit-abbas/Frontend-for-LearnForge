import React, { createContext, useState } from "react";

export const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [selected, setselected] = useState("");
  const [quizes, setquizes] = useState([]);
  return (
    <QuizContext.Provider value={{ selected, setselected , quizes , setquizes}}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
