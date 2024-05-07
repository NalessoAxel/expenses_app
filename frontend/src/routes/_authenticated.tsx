import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return (
      <>
        <div>You need to login</div>
        <a href="/api/login">Login!</a>
      </>
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return { user: data };
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  },
  component: Component,
});
