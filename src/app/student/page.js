"use client"
import api from '@/utils/authClient'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [student, setstudent] = useState([])
    const [userProfile, setuserProfile] = useState()
    useEffect(() => {
      const loadData = async () => {
        const all_data = await api.get('app/student')
        setuserProfile(JSON.parse(localStorage.getItem("user")))
        setstudent(all_data.data)
      }
      loadData()
    }, [])
    
  return (
    <div className='bg-slate-900 mt-20 min-screen px-10'>
        <header className='flex flex-col justify-center-center gap-3 py-5'>
            <h1 className='font-bold text-5xl'>Welcome {userProfile?.username}</h1>
            <p>Every lesson you complete brings you one step closer to mastering your goals</p>
        </header>
    </div>
  )
}

export default Page
