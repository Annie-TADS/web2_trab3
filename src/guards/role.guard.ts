import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import RolesUser from "src/auth/enums/roles.enums";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesRequired = this.reflector.get<string[]>(
      "roles",
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (rolesRequired.includes(RolesUser.ADMIN) && user.admin) {
      return true
    }

    if (rolesRequired.includes(RolesUser.SUPERUSER) && user.superUser) {
      return true
    }

    return false;
  }
}