import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-forms';
  defaultSecret = 'pet';
  data = '';
  genders = ['male', 'female'];
  suggestUsername = '';
  @ViewChild('f') loginformvalue: NgForm;
  onSubmit(formvalue: NgForm) {
    console.log(formvalue.value);
    this.data = this.loginformvalue.value;
    console.log(this.loginformvalue.value);
  }
  suggestname() {
    let random = Math.floor(Math.random() * 100);
    this.suggestUsername = 'emddeveloper_' + random;
    this.loginformvalue.form.patchValue({
      userData: {
        username: this.suggestUsername,
      },
    });
  }
}
