import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getUser } from "../kinde";

import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expense";
import { eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(3).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, name: "Rent", amount: "1000" },
  { id: 2, name: "Food", amount: "200" },
];

const fakeExpenseSchema = expenseSchema.omit({ id: true });

export const expensesRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    return c.json({
      expenses: expenses,
    });
  })
  .post("/", getUser, zValidator("json", fakeExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const result = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: user.id,
      })
      .returning();

    c.status(201);

    return c.json(result);
  })
  .get("/total-spend", (c) => {
    const total = fakeExpenses.reduce((acc, e) => acc + +e.amount, 0);

    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = fakeExpenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return c.notFound();
    }

    fakeExpenses.splice(index, 1);

    return c.json({});
  });
//.put
