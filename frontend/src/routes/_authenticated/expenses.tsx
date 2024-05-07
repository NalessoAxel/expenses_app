import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch all expenses");
  }
  const data = await response.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
              </TableRow>
            ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="capitalize">{expense.name}</TableCell>
                <TableCell className="text-right ">
                  {expense.amount}
                  <span className="pl-2">$</span>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
