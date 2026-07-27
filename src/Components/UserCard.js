import React from 'react'

const UserCard = (props) => {
  return (
    <div id={props.id} className="card flex flex-col p-3 rounded-xl gap-3 w-150 border-2 border-white bg-linear-to-l from-blue-600 to-purple-600 text-center">
        <h1 className="p-3 rounded-xl bg-blue-900 font-bold flex gap-3">
          Username : <p className="text-xl">{props.username}</p>
        </h1>
        <h1 className="p-3 rounded-xl bg-blue-900 font-bold flex gap-3">
          Email : <p className="text-xl">{props.email}</p>
        </h1>
        <h1 className="p-3 rounded-xl bg-blue-900 font-bold flex gap-3">
          Role : <p className="text-xl">{props.role}</p>
        </h1>
        <h1 className="p-3 rounded-xl bg-blue-900 font-bold flex gap-3 items-center justify-center">
          <button className="bg-blue-500 font-bold px-5 py-2 rounded-2xl hover:bg-blue-700 transition-all duration-300 cursor-pointer active:scale-70">Edit</button>
          <button className="bg-red-500 font-bold px-5 py-2 rounded-2xl hover:bg-red-700 transition-all duration-300 cursor-pointer active:scale-70">Delete</button>
        </h1>
      </div>
  )
}

export default UserCard
