import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private appservice: AppService) {}
  title = 'rxjs-observable';
  myCounterSubscription: Subscription;
  ngOnInit() {}
  ngOnDestroy() {}
}
