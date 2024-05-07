import {
  numeric,
  pgTable,
  serial,
  varchar,
  text,
  index,
} from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: varchar("name", { length: 256 }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);
