import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { OnInit } from "@angular/core";
import { Observable } from "rxjs";
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const modified = req.clone({
      headers: req.headers.append("Auth", "Bearer " + new Date()),
    });
    return next.handle(modified);
  }
}
