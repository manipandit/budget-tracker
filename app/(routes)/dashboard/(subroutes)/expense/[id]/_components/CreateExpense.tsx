"use client";
import { createExpense } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { BudgetData } from "../page";

function CreateExpense({
  budget,
  budgetData,
  budgetId,
  fetchBudgetInfo,
}: {
  budget: () => void;
  budgetData: BudgetData;
  budgetId: string;
  fetchBudgetInfo: () => void;
}) {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  console.log("budgetAmount", budgetData?.budgetAmount);
  console.log("totalExpenseAmount", budgetData?.totalExpenseAmount);

  const addNewExpense = async () => {
    try {
      setLoading(true);
      const result = await createExpense(name, Number(amount), budgetId);

      if (result.data.id) {
        setName("");
        setAmount("");
        fetchBudgetInfo();
        toast("New expense added successfully");
      }
    } catch (error: any) {
      console.log(error);
      //   throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validAmount =
    Number(amount) >
    budgetData?.budgetAmount! - budgetData?.totalExpenseAmount!;

  useEffect(() => {
    user && budget();
  }, [user]);
  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-xl font-bold">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1 dark:text-white">
          Expense Name
        </h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1 dark:text-white">
          Expense Amount
        </h2>
        <Input
          type="number"
          value={amount}
          min={1}
          placeholder="e.g. ₹1000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        onClick={addNewExpense}
        disabled={!(name && amount) || validAmount || Number(amount) <= 0}
        className="mt-5 w-full"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default CreateExpense;
