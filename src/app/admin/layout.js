"use client"
import { AdminSidebar } from '@/Components/AdminSidebar'
import api from '@/utils/authClient'
import React, { useEffect, useState } from 'react'

const Layout = ({children}) => {
    const [admin, setadmin] = useState('')
    useEffect(() => {
        const loadAdminData = async () => {
            const adminProfile = await api.get("app/getProfile");
            console.log(admin)
            setadmin(adminProfile.data);
        }
        loadAdminData()
    }, [])
    
  return (
    <div>
        {children}
        <AdminSidebar admin={admin} />
    </div>
  )
}

export default Layout
