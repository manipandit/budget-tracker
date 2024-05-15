"use client";

import { getBudgetInfo } from "@/actions/budget";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BudgetList } from "../../budget/_components/BudgetList";
import BudgetItem from "../../budget/_components/BudgetItem";
import { Skeleton } from "@/components/ui/skeleton";
import CreateExpense from "./_components/CreateExpense";

function ExpensePage({ params }: { params: { id: string } }) {
  console.log(params.id);

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetList[]>([]);

  const fetchBudgetInfo = async () => {
    try {
      const res = await getBudgetInfo(
        user?.primaryEmailAddress?.emailAddress!,
        params.id
      );

      setBudgetInfo(res);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    user && fetchBudgetInfo();
  }, [user]);

  return (
    <div className="p-10 grid md:grid-cols-2 gap-5">
      {budgetInfo.length > 0 ? (
        <BudgetItem budget={budgetInfo[0]} />
      ) : (
        <Skeleton className="h-[170px] w-full" />
      )}

      <CreateExpense fetchBudgetInfo={fetchBudgetInfo} budgetId={params.id} />
    </div>
  );
}

export default ExpensePage;
