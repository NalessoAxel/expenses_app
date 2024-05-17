import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

import { type CreateExpense } from "@server/sharedTypes";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUSer() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: getCurrentUSer,
  staleTime: Infinity,
});

export async function getAllExpenses() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch all expenses");
  }
  const data = await response.json();
  return data;
}

export const getAllExpensesQuery = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export async function createExpense({ value }: { value: CreateExpense }) {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) {
    throw new Error(" Failed to create expense");
  }

  const newExpenses = await res.json();
  return newExpenses;
}
