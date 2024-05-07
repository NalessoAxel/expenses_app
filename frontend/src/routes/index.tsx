import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default Index;
