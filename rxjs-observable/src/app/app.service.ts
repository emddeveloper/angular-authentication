import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnInit {
  getCounter() {
    const myCounterObservable = new Observable((observer) => {
      let counter = 0;
      setInterval(() => {
        if (counter > 5) {
          observer.error(new Error());
        }
        observer.next(counter);
        counter += 1;
      }, 1000);
    });
    return myCounterObservable;
  }
  ngOnInit() {}
}
