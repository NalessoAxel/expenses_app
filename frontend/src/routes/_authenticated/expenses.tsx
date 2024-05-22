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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllExpensesQuery,
  loadingCreateExpenseQueryOptions,
  deleteExpense,
} from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQuery);

  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table className="max-w-2xl mx-auto">
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Amount</TableHead>

          <TableHead>Date</TableHead>

          <TableHead>Category</TableHead>

          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loadingCreateExpense?.expense && (
          <TableRow>
            <TableCell>
              <Skeleton className="h-4" />
            </TableCell>

            <TableCell className="capitalize">
              {loadingCreateExpense?.expense.title}
            </TableCell>

            <TableCell>
              {loadingCreateExpense?.expense.amount}
              <span className="pl-2">$</span>
            </TableCell>

            <TableCell className="capitalize">
              {loadingCreateExpense?.expense.date}
            </TableCell>

            <TableCell>{loadingCreateExpense?.expense.category}</TableCell>
            <TableCell>
              <Skeleton className="h-4" />
            </TableCell>
          </TableRow>
        )}
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

                <TableCell className="capitalize">{expense.category}</TableCell>

                <TableCell>
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast.error("Failed to delete expense");
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      queryClient.invalidateQueries(getAllExpensesQuery);
    },
  });

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => mutation.mutate({ id })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "..." : <Trash width={12} height={12} />}
    </Button>
  );
}
