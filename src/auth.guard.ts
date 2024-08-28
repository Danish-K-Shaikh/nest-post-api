import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public-strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request.headers);
    request['user'] = token;
    return true;
  }

  private getToken(headers) {
    const authorization = headers.authorization;
    if (!authorization) throw new UnauthorizedException();
    const [type, token] = authorization.split(' ');
    if (type !== 'bearer' || !token) throw new UnauthorizedException();
    return token;
  }
}
