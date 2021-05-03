import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-orientation-selector',
  templateUrl: './orientation-selector.component.html',
  styleUrls: ['./orientation-selector.component.scss'],
})
export class OrientationSelectorComponent {

  @Output() orientation = new EventEmitter< 'N' | 'S' | 'E' | 'W'>();
  orientationVal: (  'N' | 'S' | 'E' | 'W') = 'N';

  setOrientation( orientation: 'N' | 'S' | 'E' | 'W' ){
    this.orientation.emit(orientation);
    this.orientationVal = orientation
  }

}
