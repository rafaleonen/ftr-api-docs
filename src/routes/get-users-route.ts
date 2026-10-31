import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/users",
    {
      schema: {
        tags: ["Users"],
        summary: "Get all users",
        querystring: z.object({
          page: z.coerce.number().int().min(1).default(1),
        }),
        response: {
          200: z
            .object({
              items: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string().max(100).nullable(),
                  email: z.email(),
                })
              ),
            })
            .describe("A list of users"),
        },
      },
    },
    async (_, reply) => {
      return reply.status(200).send({
        items: [{ id: "123", name: "user-name", email: "user@mail.com" }],
      });
    }
  );
};
