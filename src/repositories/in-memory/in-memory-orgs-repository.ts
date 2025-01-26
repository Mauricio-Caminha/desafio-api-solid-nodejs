import { Prisma, Org } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { OrgsRepository } from "@/@types/orgs-repository";

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
}
