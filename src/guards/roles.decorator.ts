import { SetMetadata } from "@nestjs/common";
import RolesUser from "src/auth/enums/roles.enums";

export const Roles = (...roles: RolesUser[]) => {
  return SetMetadata("roles", roles);
};