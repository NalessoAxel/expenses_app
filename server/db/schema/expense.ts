import { time } from "drizzle-orm/mysql-core";
import {
  numeric,
  pgTable,
  serial,
  varchar,
  text,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: varchar("name", { length: 256 }),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);
