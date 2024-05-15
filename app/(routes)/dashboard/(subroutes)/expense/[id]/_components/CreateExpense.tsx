import { createExpense } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateExpense({
  budgetId,
  fetchBudgetInfo,
}: {
  budgetId: string;
  fetchBudgetInfo: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const addNewExpense = async () => {
    try {
      const result = await createExpense(name, amount, budgetId);

      if (result.data.id) {
        fetchBudgetInfo();
        toast("New expense added successfully");
      }
    } catch (error: any) {
      console.log(error);
      //   throw new Error(error.message);
    }
  };
  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-xl font-bold">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. ₹1000"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button
        onClick={addNewExpense}
        disabled={!(name && amount)}
        className="mt-5 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default CreateExpense;
