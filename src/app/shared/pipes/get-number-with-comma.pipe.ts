import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNumberWithComma'
})
export class GetNumberWithCommaPipe implements PipeTransform {

  transform(value: any): any {
    // value = String(value);
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
