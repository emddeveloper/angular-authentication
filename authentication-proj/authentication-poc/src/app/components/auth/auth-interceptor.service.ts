import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authservice.users.pipe(
      take(1),
      exhaustMap((userdata) => {
        if (!userdata) return next.handle(req);
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', userdata.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
