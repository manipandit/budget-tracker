import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ExpenseTable } from "./[id]/_components/ExpenseTable";
import Expenses from "./_components/Expenses";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const expensesInfo = await prisma.budget.findMany({
    where: {
      createdBy: user?.primaryEmailAddress?.emailAddress,
    },
    include: {
      expenses: true,
    },
  });

  // Extract only the expenses from the budgets
  const allExpenses = expensesInfo
    .flatMap((budget) => budget.expenses)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  console.log(allExpenses);

  return (
    <div className="p-10">
      <div>
        <h2 className="text-2xl font-bold">List of Expenses</h2>
        <div className="mt-5">
          {allExpenses.length === 0 ? (
            <span className="text-xl text-muted-foreground text-center">
              No Expenses yet
            </span>
          ) : (
            <Expenses expenses={allExpenses} />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
