import { deleteExpense } from "@/actions/expense";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Expense } from "@prisma/client";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export function ExpenseTable({
  expenses,
  fetchBudgetInfo,
}: {
  expenses: Expense[];
  fetchBudgetInfo?: () => void;
}) {
  const removeExpense = async (expenseId: string) => {
    try {
      const result = await deleteExpense(expenseId);

      if (result.id) {
        if (fetchBudgetInfo) fetchBudgetInfo();
        toast("Expense deleted successfully");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };
  return (
    <div>
      {fetchBudgetInfo && (
        <h2 className="text-xl font-bold mb-2">Recent Expenses</h2>
      )}
      <Table className="border">
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader className="bg-slate-50 ">
          <TableRow>
            <TableHead className="font-bold text-black">Name</TableHead>
            <TableHead className="font-bold text-black">Amount</TableHead>
            <TableHead className="font-bold text-black">Date</TableHead>
            {fetchBudgetInfo && (
              <TableHead className="font-bold text-left text-black">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell className="font-medium">
                ₹{expense.expenseAmount}
              </TableCell>
              <TableCell className="font-medium">
                {new Date(expense.createdAt).toLocaleString()}
              </TableCell>
              {fetchBudgetInfo && (
                <TableCell className="font-medium">
                  <Trash
                    className="text-red-400 cursor-pointer h-5 w-5 text-right"
                    onClick={() => removeExpense(expense.id)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
