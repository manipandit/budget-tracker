import BudgetList from "./_components/BudgetList";

function BudgetPage() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">My Budgets</h2>
      <BudgetList />
    </div>
  );
}

export default BudgetPage;
