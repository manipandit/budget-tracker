"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import prisma from "@/db";
import { useUser } from "@clerk/nextjs";
import { getAllBudgets } from "@/actions/budget";
import BudgetItem from "./BudgetItem";
import { Budget, Expense } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export interface BudgetList {
  id: string;
  name: string;
  amount: number;
  icon: string | null;
  createdBy: string;
  expenses: Expense[];
  totalExpenseAmount: number;
  totalExpenseCount: number;
}

function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<BudgetList[]>([]);

  const handleGetAllBudgets = async () => {
    const data = await getAllBudgets(user?.primaryEmailAddress?.emailAddress!);
    // console.log(data);
    setBudgetList(data);
  };

  useEffect(() => {
    user && handleGetAllBudgets();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget handleGetAllBudgets={handleGetAllBudgets} />
        {budgetList.length > 0
          ? budgetList.map((budget) => {
              return (
                <Link href={`/dashboard/expense/${budget.id}`} key={budget.id}>
                  <BudgetItem budget={budget} />
                </Link>
              );
            })
          : [1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-[170px] w-full" />
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
