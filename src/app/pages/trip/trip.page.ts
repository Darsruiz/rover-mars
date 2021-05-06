import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from '../../service/helpers.service';
import { Rover } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  finished = false;
  constructor( private router: Router, public helpers: HelpersService ) {
   }
   xWidth;
   yHeight
   orientation;
   currentRover:Rover;

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


  @HostListener('document:keydown', ['$event'])

  // this function handles keyboard events

  handleKeyboardEvent(event: KeyboardEvent) {
    // handles keyboard activity to make it more arcade

    if (event.code === 'ArrowUp'){
      console.log('A')
      this.helpers.arcadeTrip('A')

    }else if(event.code === 'ArrowRight'){
      console.log('R')
      this.helpers.arcadeTrip('R')

    }else if(event.code === 'ArrowLeft'){
      console.log('L')
      this.helpers.arcadeTrip('L')

    }else{

    }

  
  } 



  navigateBack(){
    this.router.navigateByUrl('home').then(()=>{

      // I reset the state of trip to preparing;
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
