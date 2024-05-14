import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { getUser } from "../kinde";

import { db } from "../db";

import {
  expenses as expensesTable,
  insertExpensesSchema,
} from "../db/schema/expense";

import { desc, eq, sum, and } from "drizzle-orm";

import { createExpensesSchema } from "../sharedTypes";

export const expensesRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({
      expenses: expenses,
    });
  })
  .post("/", getUser, zValidator("json", createExpensesSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const validatedExpense = insertExpensesSchema.parse({
      ...expense,
      userId: user.id,
    });

    const result = await db
      .insert(expensesTable)
      .values(validatedExpense)
      .returning();

    c.status(201);

    return c.json(result);
  })
  .get("/total-spend", getUser, async (c) => {
    const user = c.var.user;

    const total = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((res) => res[0].total || "0.00");

    return c.json({ total });
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const user = c.var.user;

    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense: expense });
  });
//.put
