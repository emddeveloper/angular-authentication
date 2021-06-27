import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css'],
})
export class ReactiveformComponent implements OnInit {
  genders = ['male', 'female'];
  //forbidden username
  forbiddenusernames = ['sk', 'admin'];
  //declearation of the property with type
  signupform: FormGroup;
  //display form data
  data = {};
  //onsubmit function
  onSubmit() {
    console.log(this.signupform);
    this.data = this.signupform.value;
  }
  //add hobbies
  addhobby() {
    let control = new FormControl(null, Validators.required);
    (<FormArray>this.signupform.get('hobbies')).push(control);
  }
  get Controls() {
    return (<FormArray>this.signupform.get('hobbies')).controls;
  }
  //custom validation function for foriddenusername
  forbiddenusernameFunction(usernamecontrol: FormControl): {
    [s: string]: boolean;
  } {
    console.log(usernamecontrol);
    if (this.forbiddenusernames.indexOf(usernamecontrol.value) !== -1) {
      return { forbiddenuser: true };
    }
    return null;
  }

  //async validator

  forbiddenemail(emailcontrol: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (emailcontrol.value === 'test@test.com') {
          resolve({ emailforbidden: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
  ngOnInit() {
    //initialiazation of the property with values //type FormGroup with its elemets FormControl
    this.signupform = new FormGroup({
      userdata: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenusernameFunction.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenemail
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
  }
}
