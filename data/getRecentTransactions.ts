import "server-only";

import { auth } from "@clerk/nextjs/server";
import { asc, desc, eq } from "drizzle-orm";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { db } from "@/db";

export async function getRecentTransactions() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const transactions = await db
    .select(
        {
        id: transactionsTable.id,
        amount: transactionsTable.amount,
        description: transactionsTable.description,
        transactionDate: transactionsTable.transactionDate,
        category: categoriesTable.name,
        transactionType: categoriesTable.type
       }
    )
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.transactionDate))
    .limit(5)
    .leftJoin(
        categoriesTable, 
        eq(categoriesTable.id, transactionsTable.categoryId)
    )

  return transactions;
}