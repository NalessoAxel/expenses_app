import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  return (
    
      <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you have spent.</CardDescription>
      </CardHeader>
      
        <CardContent className="text-4xl font-bold">${totalSpent}</CardContent>
        <CardFooter />
      </Card>

  )
}

export default App 
