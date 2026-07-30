import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LineChartComp = (props) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={props.data}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis stroke='#ffffff' dataKey={"month"} />
         <YAxis stroke='#ffffff' />
         <Tooltip />
         <Line type="monotone" dataKey={"count"} stroke='#3b82f6' strokeWidth={3}/>
        </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartComp
