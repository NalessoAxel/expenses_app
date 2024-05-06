import { Hono } from "hono";
import { expensesRoutes } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

const apiRoutes = app.basePath('api').route("/expenses", expensesRoutes); // need to make this as variable so i can expose the type to my client

app.get("*", serveStatic({ root: "./frontend/dist" }));

app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
