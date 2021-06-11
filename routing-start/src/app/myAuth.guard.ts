import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class MyAuthGuard implements CanActivate {
  constructor(private authservise: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authservise.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
// this is for my own practice u can create by using cli command ng g guard auth
