import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-forms';
  @ViewChild('f') loginformvalue: NgForm;
  onSubmit(formvalue: NgForm) {
    console.log(formvalue.value);
    console.log(this.loginformvalue.value);
  }
}
