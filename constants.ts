import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export const sideBarList = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LayoutGrid,
        path: "/dashboard"
    },
    {
        id: 2,
        name: 'Budget',
        icon: PiggyBank,
        path: "/dashboard/budget"
    },
    {
        id: 3,
        name: 'Expense',
        icon: ReceiptText,
        path: "/dashboard/expense"
    },
]