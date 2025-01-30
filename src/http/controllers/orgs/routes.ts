import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { nearby } from "./nearby";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/orgs/nearby", { onRequest: [verifyJwt] }, nearby);
}
