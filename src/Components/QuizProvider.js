"use client"
import React, { createContext, useState } from 'react'

export const QuizContext = createContext()
const QuizProvider = ({children}) => {
    const [selected, setselected] = useState("")
  return (
    <QuizContext.Provider value={{selected,setselected}}>
        {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider
