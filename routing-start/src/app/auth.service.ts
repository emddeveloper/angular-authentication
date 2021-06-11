import { Injectable } from "@angular/core";
import { rejects } from "assert";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLogin = false;
  constructor() {}
  isAuthenticated() {
    return this.isLogin;
  }
  onLogin() {
    this.isLogin = true;
  }
  onLogout() {
    this.isLogin = false;
  }
}
