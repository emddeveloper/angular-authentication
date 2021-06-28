import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { ReactiveFormExam } from './reactiveFormExam/reactiveformexam.component';
import { ReversePipe } from './revers.pipe';
import { subscription } from './subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    subscription,
    ReactiveformComponent,
    ReactiveFormExam,
    ReversePipe,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
