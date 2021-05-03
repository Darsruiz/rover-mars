import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-input-coordinates',
  templateUrl: './input-coordinates.component.html'
})
export class InputCoordinatesComponent {

  @Output() updateSquare = new EventEmitter
  @Input() inSquareHeight:boolean = true;
  @Input() inSquareWidth:boolean = true;
  @Input() width:number = 0;
  @Input() height:number = 0;



  updateSquareF(ev, what:string){
    this.updateSquare.emit({ev,what})
  }

}
