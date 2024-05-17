import type { z } from "zod";
import { insertExpensesSchema } from "./db/schema/expense";

export const createExpensesSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
});

export type CreateExpense = z.infer<typeof createExpensesSchema>;
