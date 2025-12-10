"use server";

import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { transactionSchema } from "@/validation/transactionSchema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import z from "zod";

const updateTransactionSchema = transactionSchema.and(
    z.object({
    id: z.number().positive("Transaction ID is invalid!")
}))

export async function updateTransaction(data : {
    id: number,
    transactionDate: string,
    amount: number,
    categoryId: number,
    description: string
}) {
    const {userId} = await auth();
    if(!userId){
        return {
            error: true,
            message: "User not authenticated"
        }
    }

        const validation = updateTransactionSchema.safeParse(data);
         if(validation.success === false) {
        return {
            error: true,
            message: validation.error.issues[0].message
        }
    } 

    await db.update(transactionsTable)
    .set({
        amount: data.amount.toString(),
        categoryId: data.categoryId,
        description: data.description,
        transactionDate: data.transactionDate,
        userId
    }).where(
        and(
            eq(transactionsTable.id, data.id),
            eq(transactionsTable.userId, userId)
        )
    );
}

export async function deleteTransaction(transactionId: number) {
    const {userId} = await auth();      
    if(!userId){
        return {
            error: true,
            message: "User not authenticated"
        }
    }
    await db.delete(transactionsTable)
    .where
    (
        and(
        eq(transactionsTable.id, transactionId), 
        eq(transactionsTable.userId, userId)
    ))
}