import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
        .send<UserDto>('authenticate', {
          Authentication: jwt,
        })
        .pipe(
          tap((res) => {
            context.switchToHttp().getRequest().user = res;
          }),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
