import { Org } from "@prisma/client";

export interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

export interface CreateOrgUseCaseResponse {
  org: Org;
}

export interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

type OrgWithoutPassword = Omit<Org, "password">;

export interface FetchNearbyOrgsUseCaseResponse {
  orgs: OrgWithoutPassword[];
}
