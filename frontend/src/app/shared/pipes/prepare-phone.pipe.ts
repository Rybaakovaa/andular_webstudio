import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparePhone'
})
export class PreparePhonePipe implements PipeTransform {

  transform(value: string): string {
    const pattern = new RegExp(`(^\\d{${value.length % 10}})(\\d{3})(\\d{3})(\\d{2})(\\d{2}$)`);
    const formattedNumber = value.replace(pattern, '+$1 ($2) $3-$4-$5');
    return formattedNumber;
  }

}
