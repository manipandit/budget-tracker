"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { BudgetList } from "../../../budget/_components/BudgetList";
import { updateBudget } from "@/actions/budget";
import { toast } from "sonner";

function EditBudget({
  budgetInfo,
  fetchBudgetInfo,
}: {
  budgetInfo: BudgetList;
  fetchBudgetInfo: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const editBudget = async () => {
    try {
      const result = await updateBudget(
        name,
        amount,
        emojiIcon!,
        budgetInfo.id
      );

      if (result.id) {
        fetchBudgetInfo();
        toast("budget updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"sm"} variant={"ghost"} className="border">
            Edit Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="cursor-pointer text-2xl bg-slate-100 rounded-full"
                  onClick={() => setOpenEmojiDialog(!openEmojiDialog)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiDialog}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiDialog(false);
                    }}
                    theme={Theme.AUTO}
                  />
                </div>
                <div className="mt-3">
                  <h2 className="text-black font-medium my-1 dark:text-white">
                    Budget Name
                  </h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <h2 className="text-black font-medium my-1 dark:text-white">
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    placeholder="e.g. ₹1000"
                    defaultValue={budgetInfo?.amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount) || loading}
                className="w-full mt-5"
                onClick={editBudget}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
