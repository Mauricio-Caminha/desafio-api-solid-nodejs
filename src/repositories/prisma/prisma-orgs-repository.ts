import { Prisma, Org } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { FindManyNearby, OrgsRepository } from "@/@types/orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });
    return org;
  }
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } });
    return org;
  }
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { id } });
    return org;
  }
  async findManyNearby(params: FindManyNearby): Promise<Org[]> {
    const gyms = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `;

    return gyms;
  }
}
