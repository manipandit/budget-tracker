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
      console.log(response);
      return {data: response};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create budget");
    }
}


export async function getAllBudgets(userEmail: string) {

    
    const response = await prisma.budget.findMany({
      where: {
        createdBy: userEmail,
      },
      include: {
        expense: {
          select: {
            expenseAmount: true,
          }
        },
      },
    });

    return response;
}