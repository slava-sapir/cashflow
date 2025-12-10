"use client";

import TransactionForm, { transactionFormSchema } from "@/components/transaction-form";
import { type Category } from "@/types/Category";
import z from "zod";
import { createTransaction } from "./actions";
import { format } from "date-fns";
import { toastError, toastSuccess } from "@/lib/toast-utils";
import { useRouter } from "next/navigation";


export default function NewTransactionForm({categories } : {categories: Category[] }) {
    const router = useRouter();
    const handleSubmit = async(data: z.infer<typeof transactionFormSchema>) => {
       const result = await createTransaction({
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
       });

       if(result.error) {
            toastError(`Error: ${result.message}`);
       }
       toastSuccess(`Success: ${result.message}`);

       router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);  
    }
      return (
        <TransactionForm onSubmit={handleSubmit} categories={categories} />
      );
}
    