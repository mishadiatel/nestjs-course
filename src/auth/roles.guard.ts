import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest<Request>();
      const authorizationHeader = req.headers.authorization;

      const [bearer, token] = authorizationHeader?.split(' ') ?? [];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized user' });
      }

      const user = this.jwtService.verify(token);
      (req as any).user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (err) {
      throw new HttpException('Dont have permission', HttpStatus.FORBIDDEN);
    }
  }
}
