import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { WrapperContext } from "./Wrapper";

const LineChartComp = (props) => {
  const data = props.data;
  const {toggleTheme} = useContext(WrapperContext)

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke={`${toggleTheme ? '#000000':'#ffffff'}`} dataKey={"month"} />
        <YAxis stroke={`${toggleTheme ? '#000000':'#ffffff'}`} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={"count"}
          stroke="#3b82f6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
