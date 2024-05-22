import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";

import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="flex items-baseline justify-between max-w-2xl p-2 m-auto">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl">BudgetBuddy</h1>
      </Link>
      <div className="flex gap-2 p-2">
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>

        <Link to="/create-expenses" className="[&.active]:font-bold">
          Create
        </Link>

        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />

      <Toaster />
    </>
  );
}
