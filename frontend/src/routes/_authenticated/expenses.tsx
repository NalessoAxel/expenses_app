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

import { useQuery } from "@tanstack/react-query";

import { getAllExpensesQuery } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQuery);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table className="max-w-2xl mx-auto">
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
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
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
              </TableRow>
            ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="capitalize">{expense.title}</TableCell>
                <TableCell>
                  {expense.amount}
                  <span className="pl-2">$</span>
                </TableCell>
                <TableCell className="capitalize">{expense.date}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
