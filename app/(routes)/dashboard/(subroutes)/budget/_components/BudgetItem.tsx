import React from "react";
import { Budget, Expense } from "@prisma/client";
import { BudgetList } from "./BudgetList";

function BudgetItem({ budget }: { budget: BudgetList }) {
  const calcProgress = () => {
    const percentage = (budget.totalExpenseAmount / budget.amount) * 100;
    return percentage.toFixed(2);
  };
  return (
    <div className="p-5 h-[170px] border rounded-lg cursor-pointer hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-400">
              {budget.totalExpenseCount} Expenses
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-lg text-primary">₹{budget.amount}</h2>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between font-semibold mb-4">
          <h2 className="text-xs text-slate-400 ">
            ₹{budget.totalExpenseAmount} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ₹{budget.amount - budget.totalExpenseAmount} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className=" bg-primary h-2 rounded-full"
            style={{ width: `${calcProgress()}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
