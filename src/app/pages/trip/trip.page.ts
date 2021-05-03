import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from '../../service/helpers.service';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  finished = false;
  constructor( private router: Router, public helpers: HelpersService ) {
   }

  ngOnInit() {

    this.finished = false;
    this.helpers.stateTrip = 'ongoing';
    
    const checkWhenFinished = setInterval(()=>{
      if(this.helpers.stateTrip !== 'ongoing'){
        this.finished = true;
        this.helpers.stateTrip === 'success' ? this.successTrip() : this.failedTrip();
        
        clearInterval(checkWhenFinished);
      }
      
    }, 1000)
  }


  navigateBack(){
    this.router.navigateByUrl('home').then(()=>{
      this.helpers.stateTrip = 'preparing';
    })
    
  }

  successTrip(){
    this.helpers.presentToast('Congratulations for your successfull trip, please come back!', 'success', 5000);

  }

  failedTrip(){
    this.helpers.presentToast('You went off the limits of the square, the trip was unsuccessfull', 'danger', 5000);

  }

  getWidth(){ 
    // get width of square
    return this.helpers.getSquare().width < 800 ?  `${this.helpers.getSquare().width}px` : '800px';
  }

  getHeight(){
    // get height of square
    return this.helpers.getSquare().height < 800 ?  `${this.helpers.getSquare().height}px` : '800px';
  }

}
