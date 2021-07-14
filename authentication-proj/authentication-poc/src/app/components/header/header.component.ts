import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authservice: AuthService) {}
  subUsers: Subscription;
  isAuthenticated = false;
  logout() {
    this.authservice.logout();
  }
  ngOnInit(): void {
    this.subUsers = this.authservice.users.subscribe((userdata) => {
      this.isAuthenticated = userdata ? true : false;
    });
  }
  ngOnDestroy() {
    this.subUsers.unsubscribe();
  }
}
