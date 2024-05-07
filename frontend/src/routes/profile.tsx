import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

async function getCurrentUSer() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await res.json();
  return data;
}

function Profile() {
  const { isPending, data, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUSer,
  });
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
