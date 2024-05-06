import { useEffect, useState } from "react";

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
  if(!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data.total;
}

function App() {
  const query = useQuery({
    queryKey:[ "get-total-spend"],
    queryFn: fetchTotalSpent
    
  });
  

  // useEffect(() => {
  //   async function fetchTotalSpent() {
  //     const response = await api.expenses["total-spend"].$get();
  //     console.log(response)
  //     const data = await response.json();
  //     setTotalSpent(data.total);
  //   }
  //   fetchTotalSpent();
  // }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent.</CardDescription>
      </CardHeader>

      <CardContent className="text-4xl font-bold">${totalSpent}</CardContent>
      <CardFooter />
    </Card>
  );
}

export default App;
