import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

async function fetchTotalSpent() {
  const response = await api.expenses["total-spend"].$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spend"],
    queryFn: fetchTotalSpent,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent.</CardDescription>
      </CardHeader>

      <CardContent className="text-4xl font-bold">
        {isPending ? "..." : data.total}$
      </CardContent>
      <CardFooter />
    </Card>
  );
}

export default Index;
