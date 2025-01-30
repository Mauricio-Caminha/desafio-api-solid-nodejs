import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { hash } from "bcryptjs";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: "Pets Orgs",
      author_name: "Mauri",
      email: "org@email.com",
      whatsapp: "123456789",
      password: await hash("123456", 6),
      cep: "88888888",
      city: "City",
      state: "State",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: 0,
      longitude: 0,
    },
  });

  const responseAuth = await request(app.server).post("/sessions").send({
    email: "org@email.com",
    password: "123456",
  });

  const { token } = responseAuth.body;
  const { id } = org;

  return {
    token,
    id,
  };
}
