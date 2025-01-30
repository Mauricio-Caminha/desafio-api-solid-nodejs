import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { create } from "./create";
import { getPet } from "./get-pet";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJwt] }, create);
  app.get("/pets", search);
  app.get("/pets/:petId", getPet);
}
