import { insertExpensesSchema } from "./db/schema/expense";

export const createExpensesSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
});
