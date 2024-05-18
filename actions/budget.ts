"use server"
import prisma from "@/db";

export async function createBudget(name: string, amount: number, emojiIcon: string, userEmail: string){

    try {
        const response = await prisma.budget.create({
            data: {
                name,
                amount,
                icon: emojiIcon,
                createdBy: userEmail,
            },
            select: {
                id: true,
            },
      });
      // console.log(response);
      return {data: response};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create budget");
    }
}


export async function getAllBudgets(userEmail: string) {
 const budgetTotals = await prisma.expense.groupBy({
    by: ['budgetId'],
    _sum: {
      expenseAmount: true,
    },
    _count: {
      id: true,
    },
  });

  const budgets = await prisma.budget.findMany({
    where: {
      createdBy: userEmail,
    },
    include: {
      expenses: true,
    },
  });

  const budgetsWithTotals = budgets.map(budget => {
    const totals = budgetTotals.find(total => total.budgetId === budget.id);
    return {
      ...budget,
      totalExpenseAmount: totals?._sum.expenseAmount || 0,
      totalExpenseCount: totals?._count.id || 0,
    };
  });

  // console.log(budgetsWithTotals);

  return budgetsWithTotals;
}

export async function getBudgetInfo(userEmail: string, id: string)
{
  try {
    const budgetTotals = await prisma.expense.groupBy({
      by: ['budgetId'],
      _sum: {
        expenseAmount: true,
      },
      _count: {
        id: true,
      },
    });

    const budgets = await prisma.budget.findMany({
      where: {
        createdBy: userEmail,
        id: id,
      },
      include: {
        expenses: true,
      },
    });

    const budgetsWithTotals = budgets.map(budget => {
      const totals = budgetTotals.find(total => total.budgetId === budget.id);
      return {
        ...budget,
        totalExpenseAmount: totals?._sum.expenseAmount || 0,
        totalExpenseCount: totals?._count.id || 0,
      };
    });
    // console.log(budgetsWithTotals);
    return budgetsWithTotals;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getBudgetInfoById(userEmail: string, id: string)
{
  try {
    const budget = await prisma.budget.findUnique({
        where: {
          createdBy: userEmail,
          id: id,
        },
        include: {
          expenses: true,
        },
    });

    if (!budget) {
      throw new Error('Budget not found');
    }

    const totalExpenseAmount = budget.expenses.reduce((total, expense) => total + expense.expenseAmount, 0);

    const budgetAmount = budget.amount;

    return {
      budgetAmount: budgetAmount,
      totalExpenseAmount: totalExpenseAmount
    };    
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removeBudget(budgetId: string)
{
  try {
    const result = await prisma.budget.delete({
      where: {
        id: budgetId,
      }
    })

    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function updateBudget(name: string, amount: number, icon: string, budgetId: string)
{
  try {
    const result = await prisma.budget.update({
      where: {
        id: budgetId,
      },
      data: {
        name,
        amount,
        icon,
      },
      select: {
        id: true,
      }
    })

    return result;
  } catch (error: any) {
     console.log(error);
      throw new Error(error.message);
  }
}