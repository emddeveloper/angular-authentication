import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-mycomponent',
  template: '<h1>My Component</h1>',
})
export class MyComponent implements OnInit, OnDestroy {
  constructor(private appservice: AppService) {}
  title = 'rxjs-observable';
  myCounterSubscription: Subscription;
  ngOnInit() {
    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next({ time: new Date().getTime(), count: count });
        count += 1;
        if (count > 10) {
          observer.complete();
        }
      }, 1000);
    });

    customObservable.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {},
      () => {
        window.alert('completed');
      }
    );

    this.myCounterSubscription = this.appservice.getCounter().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        window.alert(error);
      }
    );
  }
  ngOnDestroy() {
    this.myCounterSubscription.unsubscribe();
  }
}
