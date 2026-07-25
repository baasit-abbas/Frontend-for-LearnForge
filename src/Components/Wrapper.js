"use client"
import { ToastContainer } from "react-toastify";
import React from 'react'

const Wrapper = ({children}) => {
  return (
    <>
        {children}
        <ToastContainer />
    </>
  )
}

export default Wrapper
