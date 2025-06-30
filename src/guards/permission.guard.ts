import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersPermissionsService } from "src/users-permissions/users-permissions.service";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> { 
    const permissionRequired =
      this.reflector.get<string>('moduleName', context.getHandler()) ??
      this.reflector.get<string>('moduleName', context.getClass());

    if (!permissionRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    if (user.admin || user.superUser) {
      return true; 
    }

    const permissions = await this.usersPermissionsService.findByUser(user.id);

    const permission_names = permissions.map(
      (permission) => permission.permissions.moduleName,
    );

    return permission_names.includes(permissionRequired);
  }
}