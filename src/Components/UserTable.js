"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditUser from "./EditUser";
import Delete from "./Delete";

const UserTable = (props) => {
  const users = props.users()
  
  const handleDelete = (id) => {
    props.delete(id)
  }

  const handleEdit = (id,new_data) => {
    props.edit(id,new_data)
  }

  return (
    <div className="max-h-135">
      <Table className="min-w-full">
        <TableCaption></TableCaption>
        <TableHeader className="sticky top-0 z-10 bg-slate-900">
          <TableRow className="text-center">
            <TableHead className="text-center font-bold text-white">ID</TableHead>
            <TableHead className="text-center font-bold text-white">Username</TableHead>
            <TableHead className="text-center font-bold text-white">Email</TableHead>
            <TableHead className="text-center font-bold text-white">Role</TableHead>
            <TableHead className="text-center font-bold text-white">Is Active</TableHead>
            <TableHead className="text-center font-bold text-white">Last Login</TableHead>
            <TableHead className="text-center font-bold text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-slate-800'>
          {users.map((user) => {
            return (
              <TableRow className='text-center hover:bg-slate-700 border-b-2 border-gray-100' key={user.id}>
                <TableCell className='border-l-2 border-gray-100'>{user.id}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>{user.username}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>{user.email}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>{user.role}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>{user.is_active ? 'Yes':'No'}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>{user.last_login?.split('T')[0]}</TableCell>
                <TableCell className='border-l-2 border-gray-100'>  
                  <div className="flex gap-3 items-center justify-center">
                    <EditUser id={user.id} username={user.username} email={user.email} role={user.role} func={handleEdit} />
                    <Delete id={user.id} func = {handleDelete}/>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
