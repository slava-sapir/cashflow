"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2Icon } from "lucide-react";
import { deleteTransaction } from "./actions";
import { toastError, toastSuccess } from "@/lib/toast-utils";
import { useRouter } from "next/navigation";

export default function DeleteTransactionDialog({
    transactionId,
    transactionDate
} : {
    transactionId: number,
    transactionDate: string
}) {
    const router = useRouter();
    const handleDeleteConfirm = async() => {
        const result = await deleteTransaction(transactionId);
        if(result?.error) {
                   toastError(`Error: ${result.message}`);
              }
              toastSuccess(`Success: ${result?.message}`);

        const [year, month] = transactionDate.split("-"); 
        router.push(`/dashboard/transactions?month=${month}&year=${year}`);
    }
    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>  
              <AlertDialogDescription>
                Do you really want to delete the transaction on {transactionDate}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleDeleteConfirm} variant="destructive">Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
} 