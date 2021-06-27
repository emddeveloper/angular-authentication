import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subcription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class subscription implements OnInit {
  @ViewChild('f') getFormData: NgForm;
  data = {
    email: '',
    subscription: '',
  };

  subscriptions = ['basic', 'advanced', 'pro'];
  onSubmit() {
    this.data = this.getFormData.value;
  }
  ngOnInit() {}
}
