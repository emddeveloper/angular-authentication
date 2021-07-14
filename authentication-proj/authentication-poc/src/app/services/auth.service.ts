import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { users } from '../components/auth/user.model';

interface authResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
interface loginResponse {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: string;
  refreshToken: string;
  expiresIn: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  users = new BehaviorSubject<users>(null);
  private autoLogoutTimer: any;
  //documentation https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  //signup service
  signup(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYtkZOLotydy9u_ZyEtKTOPFxvk5TwSMw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error.error.error.message);
        }),
        tap((response) => {
          this.handleAuthentication(response);
        })
      );
  }
  //login service
  login(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYtkZOLotydy9u_ZyEtKTOPFxvk5TwSMw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error.error.error.message);
        }),
        tap((response) => {
          this.handleAuthentication(response);
        })
      );
  }
  //handleAuthentication

  private handleAuthentication(response: authResponse) {
    const tokenexpirationdate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new users(
      response.email,
      response.localId,
      response.idToken,
      tokenexpirationdate
    );
    this.users.next(user);
    //localstorage store the user obj
    localStorage.setItem('_userdata', JSON.stringify(user));
    // start the timer to auto logout
    this.autologout(+response.expiresIn);
  }

  //logout

  logout() {
    this.users.next(null);
    this.router.navigate(['/authentication']);
    localStorage.removeItem('_userdata');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
  }
  //auto logout
  autologout(expiarytime: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expiarytime);
  }
  //auto login
  autologin() {
    const localuserdata = JSON.parse(localStorage.getItem('_userdata'));
    if (!localuserdata) {
      return;
    }
    const loadeduser = new users(
      localuserdata.email,
      localuserdata.id,
      localuserdata._token,
      new Date(localuserdata._tokenExpiration)
    );
    if (loadeduser.token) {
      this.users.next(loadeduser);
    }
    const calExpiaryTime =
      loadeduser.tokenExpiration.getTime() - new Date().getTime();
    console.log(calExpiaryTime);
    console.log(new Date(new Date().getTime() + calExpiaryTime));
    this.autologout(calExpiaryTime);
  }
  //
}
