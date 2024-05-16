import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function Navbar() {
  return (
    <div className="flex justify-between max-w-2xl m-auto items-baseline p-2">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl">Expenses Tracker</h1>
      </Link>
      <div className="p-2 flex gap-2">
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>

        <Link to="/create-expenses" className="[&.active]:font-bold">
          Create
        </Link>

        <Link to="/about" className="[&.active]:font-bold">
          About
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
    </>
  );
}
