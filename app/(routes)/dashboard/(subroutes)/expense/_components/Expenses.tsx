"use client";

import { Expense } from "@prisma/client";
import { ExpenseTable } from "../[id]/_components/ExpenseTable";

function Expenses({ expenses }: { expenses: Expense[] }) {
  return (
    <div>
      <ExpenseTable expenses={expenses} />
    </div>
  );
}

export default Expenses;
