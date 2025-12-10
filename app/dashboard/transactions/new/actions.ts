"use server";

import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { transactionSchema } from "@/validation/transactionSchema";
import { auth } from "@clerk/nextjs/server";

export const createTransaction = async (data: {
    amount: number;
    transactionDate: string;
    description: string;
    categoryId: number;
}) => {
    const {userId} = await auth();

    if(!userId) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }    

    const validation = transactionSchema.safeParse(data);

    if(validation.success === false) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    }
    const [transaction] = await db.insert(transactionsTable).values({
        amount: data.amount.toString(),
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: data.transactionDate,
        userId
    }).returning();

    return {
        id: transaction.id,
    }
}