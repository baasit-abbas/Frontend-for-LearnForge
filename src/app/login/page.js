"use client"
import api from '@/utils/authClient'
import React, { useState } from 'react'

const Page = () => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const login = async () => {
        const data = {
            username,password
        }
        const response = await api.post('login',data)
        localStorage.setItem('token',response.data.access)
        localStorage.setItem('refresh',response.data.refresh)
        const userProfile = await api.post('app/getProfile')
        localStorage.setItem('user',userProfile.data)
    }

  return (
    <div>
      
    </div>
  )
}

export default Page
