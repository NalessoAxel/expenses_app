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

async function fetchTotalSpent() {
  const response = await api.expenses["total-spend"].$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spend"],
    queryFn: fetchTotalSpent,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent.</CardDescription>
      </CardHeader>

      <CardContent className="text-4xl font-bold">{isPending ? "..." : data.total}$</CardContent>
      <CardFooter />
    </Card>
  );
}

export default App;
