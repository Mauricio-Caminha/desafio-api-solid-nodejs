import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = getPetParamsSchema.parse(request.params);

  const getPetUseCase = makeGetPetUseCase();

  try {
    const { pet } = await getPetUseCase.execute({ pet_id: petId });

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
