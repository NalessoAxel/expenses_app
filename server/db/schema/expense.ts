import {
  numeric,
  pgTable,
  serial,
  varchar,
  text,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

import { z } from "zod";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: varchar("title", { length: 256 }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string().min(3, { message: "Title must be more than 3 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid monetary value",
  }),
});
// Schema for selecting a user - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
