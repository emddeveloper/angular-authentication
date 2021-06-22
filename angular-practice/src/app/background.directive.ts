import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appBackgroundChange]',
})
export class BackgroundDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  @HostBinding('style.backgroundColor') bgcolor: string = 'transparent';
  @HostListener('mouseenter') mousefunction() {
    this.bgcolor = 'yellow';
  }
  @HostListener('mouseleave') mouseleavefunc() {
    this.bgcolor = 'transparent';
  }
  ngOnInit() {
    //this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
}
