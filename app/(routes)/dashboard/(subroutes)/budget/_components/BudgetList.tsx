import React from "react";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  return (
    <div className="mt-7">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget />
      </div>
    </div>
  );
}

export default BudgetList;
