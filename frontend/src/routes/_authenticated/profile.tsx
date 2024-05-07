import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, data, error } = useQuery(userQueryOptions);
  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <h1>{data.given_name}</h1>
          <p>{data.email}</p>
        </div>
      )}
    </div>
  );
}
