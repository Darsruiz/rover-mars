import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPxPipe } from './addPx/add-px.pipe';
import { ConvertDirectionToArrowPipe } from './convertDirectionToArrow/convert-direction-to-arrow.pipe';
import { ConvertOrientationToArrowPipe } from './convertOrientationToArrow/convert-orientation-to-arrow.pipe';



@NgModule({
  declarations: [
    AddPxPipe,
    ConvertDirectionToArrowPipe,
    ConvertOrientationToArrowPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AddPxPipe,
    ConvertDirectionToArrowPipe,
    ConvertOrientationToArrowPipe
  ]
})
export class PipesModule { }
