import { Org } from "@prisma/client";

export interface RegisterUseCaseRequest {
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

export interface RegisterUseCaseResponse {
  org: Org;
}
