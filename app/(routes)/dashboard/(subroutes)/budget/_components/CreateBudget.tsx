"use client";
import { createBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { toast } from "sonner";

function CreateBudget({
  handleGetAllBudgets,
}: {
  handleGetAllBudgets: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState("😁");
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const handleCreateBudget = async () => {
    try {
      setLoading(true);
      const response = await createBudget(name, amount, emojiIcon, userEmail!);

      if (response.data.id) {
        handleGetAllBudgets();
        toast("Budget created successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 h-[170px] p-10 rounded flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:shadow-sm dark:text-black">
            <h2 className="text-3xl">+</h2>
            <h2 className="">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                onClick={handleCreateBudget}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
