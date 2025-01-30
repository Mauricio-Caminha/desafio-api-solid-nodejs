import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeNearbyOrgsUseCases } from "@/use-cases/factories/make-nearby-orgs-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query);

  const fetchNearbyGymUseCase = makeNearbyOrgsUseCases();

  const { orgs } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ orgs });
}
