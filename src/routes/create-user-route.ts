import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const creatUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Create an user",
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string().nullable(),
          email: z.email(),
        }),
        response: {
          201: z
            .object({
              userId: z.uuid().describe("New user ID"),
            })
            .describe("User created"),
          400: z
            .object({
              errors: z.array(
                z.object({
                  name: z.string(),
                  error: z.string(),
                })
              ),
            })
            .describe("Validation failed"),
          409: z
            .object({
              message: z.string(),
            })
            .describe("User email already in use"),
        },
      },
    },
    async (_, reply) => {
      return reply.status(201).send({ userId: "123" });
    }
  );
};
