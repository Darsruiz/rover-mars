import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PipesModule } from 'src/app/pipes/pipes-module.module';
import { InputCoordinatesComponent } from 'src/app/components/input-coordinates/input-coordinates.component';
import { OrientationSelectorComponent } from 'src/app/components/orientationSelector/orientation-selector/orientation-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule
    
  ],
  declarations: [HomePage,  InputCoordinatesComponent, OrientationSelectorComponent]
})
export class HomePageModule {}
