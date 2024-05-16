"use client";
import { Expense } from "@prisma/client";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  budgetName: string;
  budgetAmount: number;
  expenseAmount: number;
}
function BarGraph({ budgetData }: { budgetData: Props[] }) {
  return (
    <div className="border p-10">
      <h2 className="text-xl text-center font-semibold text-muted-foreground">
        Budget vs Expense
      </h2>
      <ResponsiveContainer width={"80%"} height={400}>
        <BarChart width={500} height={400} data={budgetData}>
          <XAxis dataKey={"budgetName"} style={{ fontWeight: "bold" }} />
          <YAxis style={{ fontWeight: "bold" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey={"expenseAmount"} stackId="a" fill="#008cff" />
          <Bar
            dataKey={"budgetAmount"}
            stackId="b"
            fill="#bae0ff"
            opacity={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
