import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React from "react";
import { CountUp } from "./count-up";

function CardInfo({
  totalBudget,
  totalExpense,
  noOfBudgets,
}: {
  totalBudget: number | null;
  totalExpense: number;
  noOfBudgets: number | null;
}) {
  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="p-7 border rounded-lg flex justify-between">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="text-2xl font-bold">
            ₹{" "}
            <CountUp
              start={0}
              end={totalBudget ?? 0}
              decimals={2}
              decimalPlaces={2}
            />
          </h2>
        </div>
        <div>
          <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
      <div className="p-7 border rounded-lg flex justify-between">
        <div>
          <h2 className="text-sm">Total Expense</h2>
          <h2 className="text-2xl font-bold">
            ₹{" "}
            <CountUp
              start={0}
              end={totalExpense}
              decimals={2}
              decimalPlaces={2}
            />
          </h2>
        </div>
        <div>
          <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
      <div className="p-7 border rounded-lg flex justify-between">
        <div>
          <h2 className="text-sm">No of budgets</h2>
          <h2 className="text-2xl font-bold">
            <CountUp start={0} end={noOfBudgets || 0} />
          </h2>
        </div>
        <div>
          <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
