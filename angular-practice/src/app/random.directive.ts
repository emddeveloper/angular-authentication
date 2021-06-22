import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandom]',
})
export class RandomDirective implements OnInit {
  @HostBinding('style.backgroundColor') bgcolor: string = 'red';
  @HostBinding('style.color') textcolor: string = 'white';
  hexelements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  hexcode = [];
  randomHex() {
    for (let i = 0; i < 6; i++) {
      this.hexcode.push(this.hexelements[i]);
    }
  }
  ngOnInit() {
    setInterval(() => {
      this.bgcolor = 'blue';
    }, 1000);
  }
}
