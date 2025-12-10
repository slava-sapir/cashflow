"use client";

import TransactionForm, { transactionFormSchema } from "@/components/transaction-form";
import { toastError, toastSuccess } from "@/lib/toast-utils";
import { type Category } from "@/types/Category";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import z from "zod";
import { updateTransaction } from "./actions";

export default function EditTransactionForm({
    categories, 
    transaction 
} : { categories: Category[] 
    transaction: {
        id: number,
        amount: string,
        categoryId: number,
        description: string,
        transactionDate: string,
    }
}) {
    const router = useRouter();
    const handleSubmit = async(data: z.infer<typeof transactionFormSchema>) => {
       const result = await updateTransaction({
        id: transaction.id,
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
       }); 

       if(result?.error) {
            toastError(`Error: ${result.message}`);
       }
       toastSuccess(`Success: ${result?.message}`);

       router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);  
    }
      return (
        <TransactionForm defaultValues={{
            amount: Number(transaction.amount),
            categoryId: transaction.categoryId,
            description: transaction.description,
            transactionType: categories.find( (category) => category.id === transaction.categoryId)?.type as "income" | "expense",
            transactionDate: new Date(transaction.transactionDate)
           }}
           onSubmit={handleSubmit} categories={categories} 
        />
      );

}