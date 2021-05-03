import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addPx'
})
export class AddPxPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value ? value : 0}px`;
  }

}
