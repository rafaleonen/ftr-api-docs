import type { FastifyPluginAsync } from "fastify";

export const creatUsersRoute: FastifyPluginAsync = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        summary: "Create an user",
        body: {
          type: "object",
          examples: [
            {
              name: "John Doe",
              email: "jhon.doe@example.com",
            },
          ],
          properties: {
            name: {
              type: ["string", "null"],
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
            },
          },
        },
        response: {
          201: {
            description: "User created",
            type: "object",
            properties: {
              userId: {
                type: "string",
                format: "uuid",
                description: "User created",
              },
            },
          },
        },
      },
    },
    () => {
      return { userId: "123" };
    }
  );
};
