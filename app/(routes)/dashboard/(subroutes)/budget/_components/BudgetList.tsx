"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import prisma from "@/db";
import { useUser } from "@clerk/nextjs";
import { getAllBudgets } from "@/actions/budget";
import BudgetItem from "./BudgetItem";
import { Budget, Expense } from "@prisma/client";

function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<(Partial<Expense> & Budget)[]>(
    []
  );

  const handleGetAllBudgets = async () => {
    const data = await getAllBudgets(user?.primaryEmailAddress?.emailAddress!);

    setBudgetList(data);
  };
  useEffect(() => {
    user && handleGetAllBudgets();
  }, [user]);
  return (
    <div className="mt-7">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget />
        {budgetList.map((budget) => {
          console.log(budget);
          return <BudgetItem budget={budget} />;
        })}
      </div>
    </div>
  );
}

export default BudgetList;
