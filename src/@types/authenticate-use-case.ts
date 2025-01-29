import { Org } from "@prisma/client";

export interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthenticateOrgUseCaseResponse {
  org: Org;
}
