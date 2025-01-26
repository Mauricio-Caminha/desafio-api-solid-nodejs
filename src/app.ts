import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { ZodError, ZodIssueCode } from "zod";

import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

// TODO: Add routes here
app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      route: request.method + " " + request.url,
      error: error.issues.map((issue) => {
        let error = {
          issue: issue.code,
          message: issue.message,
          path: issue.path.toString(),
        };
        if (
          issue.code === ZodIssueCode.invalid_type ||
          issue.code === ZodIssueCode.invalid_literal
        ) {
          return {
            ...error,
            expected: issue.expected,
            received: issue.received,
          };
        }
        return error;
      }),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal server error",
    route: request.method + " " + request.url,
  });
});
