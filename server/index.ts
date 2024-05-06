// file where all the http request is done
import app from "./app";

const server = Bun.serve({
  port: process.env.PORT || 3000,
  hostname: "0.0.0.0:8080",
  fetch: app.fetch,
});

console.log("server running on http://localhost:3000/:", server);
