import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPageRoutingModule } from './trip-routing.module';

import { TripPage } from './trip.page';
import { RoverComponent } from 'src/app/components/rover/rover.component';
import { PipesModule } from '../../pipes/pipes-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TripPageRoutingModule
  ],
  declarations: [TripPage, RoverComponent]
})
export class TripPageModule {}
