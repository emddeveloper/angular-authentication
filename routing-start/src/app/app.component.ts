import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService) {}
  onLogin() {
    this.authservice.onLogin();
  }
  onLogout() {
    this.authservice.onLogout();
  }
  ngOnInit() {}
}
