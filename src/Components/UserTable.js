"use client";
import React, { useContext, useEffect, useState } from "react";
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
import Delete from "./DeleteUser";
import { WrapperContext } from "./Wrapper";

const UserTable = (props) => {
  const users = props.users();
  const {toggleTheme} = useContext(WrapperContext)

  const handleDelete = (id) => {
    props.delete(id);
  };

  const handleEdit = (id, new_data) => {
    props.edit(id, new_data);
  };

  return (
    <div className="max-h-135">
      <Table className="min-w-full">
        <TableCaption></TableCaption>
        <TableHeader className={`sticky top-0 z-10 ${toggleTheme ? "bg-slate-300":"bg-slate-900"}`}>
          <TableRow className={`${toggleTheme ? 'text-slate-700':'text-slate-100'}`}>
            <TableHead className="text-center">
              ID
            </TableHead>
            <TableHead className="text-center">
              Username
            </TableHead>
            <TableHead className="text-center">
              Email
            </TableHead>
            <TableHead className="text-center">
              Role
            </TableHead>
            <TableHead className="text-center">
              Is Active
            </TableHead>
            <TableHead className="text-center">
              Last Login
            </TableHead>
            <TableHead className="text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={`${toggleTheme ? 'bg-slate-200':'bg-slate-800'}`}>
          {users.map((user) => {
            return (
              <TableRow
                className={`border-2 ${toggleTheme ? 'border-slate-600 text-gray-800':'border-slate-100'} text-center`}
                key={user.id}
              >
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.id}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.username}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.email}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.role}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.is_active ? "Yes" : "No"}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  {user.last_login
                    ? user.last_login.split("T")[0]
                    : "Not logged in yet."}
                </TableCell>
                <TableCell className={`border-l-2 ${toggleTheme ? 'border-slate-600':' border-gray-100'}`}>
                  <div className="flex gap-3 items-center justify-center">
                    <EditUser
                      id={user.id}
                      username={user.username}
                      email={user.email}
                      role={user.role}
                      func={handleEdit}
                    />
                    <Delete id={user.id} func={handleDelete} />
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
