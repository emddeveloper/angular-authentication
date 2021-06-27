import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidations } from '../customValidation';

@Component({
  selector: 'app-reactiveformexam',
  templateUrl: './reactiveformexam.component.html',
  styleUrls: ['./reactiveformexam.component.css'],
})
export class ReactiveFormExam implements OnInit {
  projectform: FormGroup;
  projectstatus = ['stable', 'critical', 'finished'];

  data: {};
  onSubmit() {
    console.log(this.projectform);
    this.data = this.projectform.value;
  }
  ngOnInit() {
    this.projectform = new FormGroup({
      projectname: new FormControl(null, [
        Validators.required,
        CustomValidations.checkforbiddenname.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        CustomValidations.uniqueEmailCheck
      ),
      status: new FormControl('stable', [Validators.required]),
    });
  }
}
