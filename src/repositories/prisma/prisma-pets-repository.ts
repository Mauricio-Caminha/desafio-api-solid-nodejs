import { Prisma, Pet } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { FindAllParams, PetsRepository } from "@/@types/pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } });
    return pet;
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: "insensitive",
          },
        },
      },
    });
    return pets;
  }
}
