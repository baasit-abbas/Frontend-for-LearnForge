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
  const registrations = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 18 },
  { month: "Mar", count: 25 },
  { month: "Apr", count: 20 },
  { month: "May", count: 32 },
  { month: "Jun", count: 28 },
  { month: "Jul", count: 40 },
  { month: "Aug", count: 36 },
  { month: "Sep", count: 45 },
  { month: "Oct", count: 50 },
  { month: "Nov", count: 42 },
  { month: "Dec", count: 60 },
];
  return (
    <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={registrations}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis stroke='#ffffff' dataKey={"month"} />
         <YAxis stroke='#ffffff' />
         <Tooltip />
         <Line type="monotone" dataKey={"count"} stroke='#3b82f6' strokeWidth={3}/>
        </LineChart>
    </ResponsiveContainer>
  )
}

export default LineChartComp
