import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchPetUseCase } from "@/use-cases/factories/make-search-pet-use-case";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  });

  const { city, age, size, energy_level, environment } =
    searchPetQuerySchema.parse(request.query);

  const searchPetUseCase = makeSearchPetUseCase();

  try {
    const { pets } = await searchPetUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
