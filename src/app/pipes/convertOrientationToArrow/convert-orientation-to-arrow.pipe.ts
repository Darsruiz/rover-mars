import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertOrientationToArrow'
})
export class ConvertOrientationToArrowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'W':{
        return 'arrow-back'
      }
        
      case 'E':{
        return 'arrow-forward'
      }
      case 'N':{
        return 'arrow-up'
      }

      case 'S':{
        return 'arrow-down'
      }
    }
  }

}
