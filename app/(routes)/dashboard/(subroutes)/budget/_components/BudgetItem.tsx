import React from "react";
import { Budget, Expense } from "@prisma/client";

function BudgetItem({ budget }: { budget: Budget & Partial<Expense> }) {
  return (
    <div className="p-5 border rounded-lg cursor-pointer hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
            {budget.icon}
          </h2>
          <div>
            <h2>{budget.name}</h2>
          </div>
        </div>
        <h2 className="font-bold text-lg text-primary">${budget.amount}</h2>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2></h2>
          {/* <h2>{budget.}</h2> */}
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div className="w-[40%] bg-primary h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
