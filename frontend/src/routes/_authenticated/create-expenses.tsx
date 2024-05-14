import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { api } from "@/lib/api";

import { createExpensesSchema } from "@server/sharedTypes";

export const Route = createFileRoute("/_authenticated/create-expenses")({
  component: CreateExpenses,
});

function CreateExpenses() {
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value });
      if (!res.ok) {
        throw new Error(" Failed to create expense");
      }
      navigate({ to: "/expenses" });
    },
  });

  console.log(form);

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
            <>
              <Input
                name={field.title}
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
