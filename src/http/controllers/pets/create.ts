import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    size: z.string(),
    org_id: z.string().uuid(),
  });

  const body = createPetBodySchema.parse(request.body);

  const createPetUseCase = makeCreatePetUseCase();

  try {
    await createPetUseCase.execute(body);
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
