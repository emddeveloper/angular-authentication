import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidations {
  static forbiddenname = ['test', 'aa'];

  static checkforbiddenname(control: FormControl): { [s: string]: boolean } {
    if (CustomValidations.forbiddenname.indexOf(control.value) !== -1) {
      return { invalidname: true };
    }
    return null;
  }
  static uniqueEmailCheck(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ invalidemail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
