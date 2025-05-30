import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = req.headers.authorization;

    const [bearer, token] = authorizationHeader?.split(' ') ?? [];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Unauthorized user' });
    }

    try {
      const user = this.jwtService.verify(token);
      (req as any).user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Unauthorized user' });
    }
  }
}
