"use client";

import { getBudgetInfo } from "@/actions/budget";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BudgetList } from "../../budget/_components/BudgetList";
import BudgetItem from "../../budget/_components/BudgetItem";
import { Skeleton } from "@/components/ui/skeleton";
import CreateExpense from "./_components/CreateExpense";
import { Expense } from "@prisma/client";
import { getExpenses } from "@/actions/expense";
import { ExpenseTable } from "./_components/ExpenseTable";
import DeleteBudget from "./_components/DeleteBudget";
import EditBudget from "./_components/EditBudget";

function ExpensePage({ params }: { params: { id: string } }) {
  console.log(params.id);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetList[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchBudgetInfo = async () => {
    try {
      const res = await getBudgetInfo(
        user?.primaryEmailAddress?.emailAddress!,
        params.id
      );

      setBudgetInfo(res);
      fetchExpenses();
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  const fetchExpenses = async () => {
    try {
      const result = await getExpenses(params.id);
      console.log(result);
      setExpenses(result);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    user && fetchBudgetInfo();
  }, [user]);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
        <div className="flex gap-x-3 items-center">
          <EditBudget
            fetchBudgetInfo={fetchBudgetInfo}
            budgetInfo={budgetInfo[0]}
          />
          <DeleteBudget budgetId={params.id} />
        </div>
      </div>
      <div className=" grid md:grid-cols-2 gap-5">
        {budgetInfo.length > 0 ? (
          <BudgetItem budget={budgetInfo[0]} />
        ) : (
          <Skeleton className="h-[170px] w-full" />
        )}

        <CreateExpense fetchBudgetInfo={fetchBudgetInfo} budgetId={params.id} />
      </div>
      <div className="mt-10">
        {expenses.length > 0 ? (
          <ExpenseTable fetchBudgetInfo={fetchBudgetInfo} expenses={expenses} />
        ) : (
          <Skeleton className="w-full h-[200px]" />
        )}
      </div>
    </div>
  );
}

export default ExpensePage;
