import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
const CircularProgressBar = (props) => {
  return (
    <CircularProgressbar className='w-100 h-100 text-gray-100' value={props.value} text={`${props.value}%`} styles={buildStyles({
    pathColor: "#2563eb",      // Progress color (blue)
    textColor: "#f3f4f6",      // Text color
    trailColor: "#e5e7eb",     // Remaining circle color
    backgroundColor: "#fff",   // Only used with background={true}
  })}/>
  )
}

export default CircularProgressBar
