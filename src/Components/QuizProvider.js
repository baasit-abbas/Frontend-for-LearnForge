import React, { createContext, useState } from "react";

export const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [selected, setselected] = useState("");
  const [quizes, setquizes] = useState([]);
  const [quiz, setquiz] = useState("");
  return (
    <QuizContext.Provider
      value={{ selected, setselected, quizes, setquizes, quiz, setquiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
