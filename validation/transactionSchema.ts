import { addDays, subYears } from "date-fns";
import z from "zod";

export const transactionSchema = z.object({
    amount: z.number().positive("Amount must be greater then zero!"),
    description: z.string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain at maximum 300 characters"),
    transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1))
    .min(subYears(new Date(), 100)),
    categoryId: z.number().positive("Category ID is invalid!"),

})