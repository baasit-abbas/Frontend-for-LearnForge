"use client"
import QuizSidebar from '@/Components/QuizSidebar'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
      <QuizSidebar />
      <div className='flex-1'>{children}</div>
    </div>
  )
}

export default Layout
