import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import { creatUsersRoute } from "./routes/create-user-route.ts";
import { getUsersRoute } from "./routes/get-users-route.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Example API Docs",
      version: "1.0.0",
    },
  },
});

app.get("/openai.json", () => app.swagger());

app.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    theme: "deepSpace",
  },
});

app.register(getUsersRoute);
app.register(creatUsersRoute);

app
  .listen({ port: 3333 })
  .then(() => console.log("Server is running at 3333!"));
