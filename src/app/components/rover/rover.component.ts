import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html'
})
export class RoverComponent {

  @Input() orientation: 'N' | 'S' | 'E' | 'W'= 'N'
  @Input() xWidth: number;
  @Input() yHeight: number;
  @Input() success: boolean;

}
