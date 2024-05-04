// file where all the http request is done
import app from "./app";

Bun.serve({
  fetch: app.fetch
})

console.log("server running on http://localhost:3000/");