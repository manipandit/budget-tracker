"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { removeBudget } from "@/actions/budget";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

function DeleteBudget({ budgetId }: { budgetId: string }) {
  const { replace } = useRouter();
  const deleteBudget = async () => {
    try {
      const result = await removeBudget(budgetId);

      if (result.id) {
        toast("Budget deleted successfully");
        replace("/dashboard/budget");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} size={"sm"}>
            Delete Budget
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              budget data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400 hover:bg-red-500"
              onClick={deleteBudget}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteBudget;
