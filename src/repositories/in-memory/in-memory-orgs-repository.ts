import { Prisma, Org } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { FindManyNearby, OrgsRepository } from "@/@types/orgs-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      ...data,
      id: randomUUID(),
      latitude: new Prisma.Decimal(data.latitude.toLocaleString()),
      longitude: new Prisma.Decimal(data.longitude.toLocaleString()),
    };

    this.items.push(org);
    return org;
  }

  async findByEmail(email: string) {
    return this.items.find((org) => org.email === email) || null;
  }

  async findById(id: string) {
    return this.items.find((org) => org.id === id) || null;
  }

  async findManyNearby(params: FindManyNearby) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }
}
