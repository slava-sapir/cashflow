import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";
import EditTransactionForm from "./edit-transaction-form";
import { getTransaction } from "@/data/getTransaction";
import { notFound } from "next/navigation";
import DeleteTransactionDialog from "./delete-transaction-dialog";

export default async function EditTransactionPage({
    params
} : {
    params:Promise<{ transactionId: string }>
}) {
    const paramsValues = await params;
    const transactionId = Number(paramsValues.transactionId);

    if(isNaN(transactionId)) {
       notFound();
    }

    const categories = await getCategories();
    const transaction = await getTransaction(transactionId);

    if(!transaction) {
        notFound();
    }

    return (
        <Card className="mt-4 max-w-3xl">
            <CardHeader>
                <CardTitle className="flex justify-between items-center gap-2">
                    <span>Edit Transaction</span>
                    <DeleteTransactionDialog transactionId={transaction.id} transactionDate={transaction.transactionDate} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <EditTransactionForm 
                   transaction={transaction} 
                   categories={categories} />
            </CardContent>
        </Card>
    )
}