"use server"
import prisma from "@/db";

export async function createExpense(name: string, amount: number, budgetId: string){
    try {
        const response = await prisma.expense.create({
            data: {
                name,
                expenseAmount: amount,
                budgetId 
            },
            select: {
                id: true,
            },
        });
        // console.log(response);
        return {data: response};
    } catch (error: any) {
        // console.log(error);
        throw new Error("internal server error ");
    }
}

export async function getExpenses(budgetId: string){
    try {
        const result = await prisma.expense.findMany({
            where: {
                budgetId
            }
        })
        return result;
    } catch (error) {
        throw new Error("internal server error ");
    }
}

export async function deleteExpense(expenseId: string)
{
    try {
        const result = await prisma.expense.delete({
            where: {
                id: expenseId
            }
        })
        return result;
    } catch (error) {
        throw new Error("internal server error ");
    }
}