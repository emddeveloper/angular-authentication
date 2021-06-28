import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  result = [];
  transform(value: any) {
    for (let char of value) {
      this.result.push(char);
    }
    return this.result.reverse().join('');
  }
}
