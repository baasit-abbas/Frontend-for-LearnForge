import React, { createContext, useState } from "react";

export const TutorContext = createContext();

const TutorProvider = ({ children }) => {
  const [chats, setchats] = useState([]);
  const [id, setid] = useState("");
  const [conversation, setconversation] = useState([]);
  const [selected, setselected] = useState("");
  return (
    <TutorContext.Provider
      value={{ chats, setchats, id, setid, conversation, setconversation , selected , setselected }}
    >
      {children}
    </TutorContext.Provider>
  );
};

export default TutorProvider;
