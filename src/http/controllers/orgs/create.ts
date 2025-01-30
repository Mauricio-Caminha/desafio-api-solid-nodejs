import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const body = createOrgBodySchema.parse(request.body);

  const createOrgUseCase = makeCreateOrgUseCase();

  try {
    await createOrgUseCase.execute(body);
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
