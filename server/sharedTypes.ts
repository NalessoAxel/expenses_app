import * as z from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Amount must be a valid monetary value",
    }),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
