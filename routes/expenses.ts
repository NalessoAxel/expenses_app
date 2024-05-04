import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

type Expense = {
  id: number;
  name: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: 1, name: "Rent", amount: 1000 },
  { id: 2, name: "Food", amount: 200 },
];

const expenseSchema = z.object({
  name: z.string(),
  amount: z.number(),
})

export const expensesRoutes = new Hono()
.get("/", (c) => {
  return c.json({
    expenses: fakeExpenses,
  });
})
.post("/",
  zValidator("json",expenseSchema ), 
  async (c) =>   {
  const data = await c.req.json();
  const expense = expenseSchema.parse(data);
  console.log(expense);
  return c.json({});
})
//.put
//.delete