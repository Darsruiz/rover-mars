import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDirectionToArrow'
})
export class ConvertDirectionToArrowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    
    switch (value) {
      case 'L':{
        return 'arrow-back'
      }
        
      case 'R':{
        return 'arrow-forward'
      }
      case 'A':{
        return 'arrow-up'
      }
    }
  }

}
