import { currentUser } from "@clerk/nextjs/server";
import CardInfo from "./_components/CardInfo";
import prisma from "@/db";
import BarGraph from "./_components/BarGraph";
import Link from "next/link";
import BudgetItem from "./(subroutes)/budget/_components/BudgetItem";
import { getAllBudgets } from "@/actions/budget";

async function page() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const data = await getAllBudgets(userEmail!);

  const budgetListWithExpenses = await prisma.budget.findMany({
    where: {
      createdBy: userEmail,
    },
    include: {
      expenses: true,
    },
  });

  const budgetData = budgetListWithExpenses.map((budget) => {
    const expenseAmount = budget.expenses.reduce(
      (sum, expense) => sum + expense.expenseAmount,
      0
    );
    return {
      budgetName: budget.name,
      budgetAmount: budget.amount,
      expenseAmount: expenseAmount,
    };
  });

  const totalBudgetAmount = await prisma.budget.aggregate({
    where: {
      createdBy: userEmail,
    },
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
  });

  const expenses = await prisma.budget.findMany({
    where: {
      createdBy: userEmail,
    },
    include: {
      expenses: {
        select: {
          expenseAmount: true,
        },
      },
    },
  });

  const expensesInfo = expenses.flatMap((e) => e.expenses);
  const expenseAmount = expensesInfo.reduce((prev, curr) => {
    return prev + curr.expenseAmount;
  }, 0);
  // console.log(expenseAmount);
  return (
    <div>
      <div className="p-8">
        <h2 className="text-2xl font-bold">Hi, {user?.firstName}</h2>
        <p className="text-sm text-muted-foreground">
          Manage your expenses from dashboard
        </p>

        <div className="mt-5">
          <CardInfo
            totalBudget={totalBudgetAmount._sum.amount}
            totalExpense={expenseAmount}
            noOfBudgets={totalBudgetAmount._count.id}
          />
        </div>
        <div className="mt-10 grid md:grid-cols-12">
          <div className="col-span-8">
            {budgetData && <BarGraph budgetData={budgetData} />}
          </div>
          <div className="px-5 col-span-4">
            <h2 className="text-xl font-bold">Latest Budgets</h2>
            <div className="grid gap-2 mt-2">
              {data.map((budget) => {
                return (
                  <Link
                    href={`/dashboard/expense/${budget.id}`}
                    key={budget.id}
                  >
                    <BudgetItem budget={budget} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
