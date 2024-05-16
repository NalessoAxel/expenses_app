import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, getAllExpensesQuery } from "@/lib/api";

import { createExpensesSchema } from "@server/sharedTypes";

export const Route = createFileRoute("/_authenticated/create-expenses")({
  component: CreateExpenses,
});

function CreateExpenses() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },

    onSubmit: async ({ value }) => {
      const existingExpenses =
        await queryClient.ensureQueryData(getAllExpensesQuery);
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error(" Failed to create expense");
      }

      const newExpenses = await res.json();

      queryClient.setQueryData(getAllExpensesQuery.queryKey, {
        ...existingExpenses,
        expenses: [...existingExpenses.expenses, newExpenses],
      });

      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <h1 className="text-2xl font-bold">Create Expenses</h1>

      <form
        className="flex gap-4 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Label htmlFor="title">Title</Label>

        <form.Field
          name="title"
          validators={{
            onChange: createExpensesSchema.shape.title,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <Label htmlFor="amount">Amount</Label>

        <form.Field
          name="amount"
          validators={{
            onChange: createExpensesSchema.shape.amount,
          }}
          children={(field) => (
            <>
              <Input
                type="number"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <Label htmlFor="date">Date</Label>

        <form.Field
          name="date"
          validators={{
            onChange: createExpensesSchema.shape.date,
          }}
          children={(field) => (
            <>
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
                className="rounded-md border"
              />
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
