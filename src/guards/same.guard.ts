import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SameGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userIdFromToken = request.user?.id;
    const userIdFromParams = request.params.id;

    if (request.user.admin || request.user.superUser) {
      return true;
    }

    if (!userIdFromToken || !userIdFromParams) {
      throw new UnauthorizedException();
    }

    const isOwner = userIdFromToken === userIdFromParams;

    if (!isOwner) {
      throw new UnauthorizedException();
    }

    return true;
  }
}