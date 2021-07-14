import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { users } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  users: users;
  constructor(private authservice: AuthService, private router: Router) {}
  toggleauthForm() {
    this.isLogin = !this.isLogin;
  }
  authformsubmit(authformdata: NgForm) {
    this.error = null;
    this.isLoading = true;
    if (this.isLogin) {
      //do login
      this.authservice
        .login(authformdata.value.email, authformdata.value.password)
        .subscribe(
          (response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/posts']);
          },
          (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
          }
        );
    } else {
      this.authservice
        .signup(authformdata.value.email, authformdata.value.password)
        .subscribe(
          (response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/posts']);
          },
          (errorMessage) => {
            this.isLoading = false;
            this.error = errorMessage;
          }
        );
    }
    authformdata.reset();
  }
  ngOnInit(): void {}
}
