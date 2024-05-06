import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(3).max(100),
  amount: z.number().int().positive().min(1),
});

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, name: "Rent", amount: 1000 },
  { id: 2, name: "Food", amount: 200 },
];

const fakeExpenseSchema = expenseSchema.omit({ id: true });

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .post("/", zValidator("json", fakeExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");

    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

    c.status(201);

    return c.json({});
  })
  .get("/total-spend", (c) => {
    const total = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);

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
