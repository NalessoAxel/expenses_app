import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { user } = Route.useRouteContext();
  const { isPending, data, error } = useQuery(userQueryOptions);

  if (user && data) {
    return (
      <>
        <div>
          <h1>{data.given_name}</h1>
          <p>{data.email}</p>
        </div>

        <Button>
          <a href="/api/logout">Logout</a>
        </Button>
      </>
    );
  }

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
