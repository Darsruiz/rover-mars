import { Component, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { HelpersService } from 'src/app/service/helpers.service';
import { Rover } from '../../interfaces/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inSquareHeight: boolean = true; // check if inside square
  inSquareWidth: boolean = true; // check if inside square
  lastOrder; // model for input of last order
  orders = [] // array or orders
  rover: Rover = {
    direction: 'R',
    coordinates: { xWidth: 0, yHeight: 0 },
    orientation: 'N',
    successTrip: true
  } // Initial Rover setup

  arrayOfAcceptedValues = [ 'L', 'A', 'R']; // Possible orders
  disabledButton = false // to change state of button deppending on validation of inputs
  @ViewChild('sliderSettings', { static: true }) private slides : IonSlides;

  slideIndex: number = 0 // current slide index


  constructor( 
    private router: Router,
    public helpers: HelpersService
    ) { }

  @HostListener('document:keydown', ['$event'])

    // this function handles keyboard events

    handleKeyboardEvent(event: KeyboardEvent) {
      console.log('handle keyboard event', event)
      // handles keyboard activity to make it more arcade
      if(this.slideIndex === 2){
      const key = event.key.toUpperCase();
      let value;
    
      if( this.helpers.isAcceptedArrow(event)
      ){
      value = this.helpers.convertEventsToDirections(event)
      this.orders.push(value);
      
      
      } else if( this.helpers.isAcceptedArrow(key))
    {
        value = key;
        this.orders.push(value);
        this.helpers.trip(this.orders, this.rover , this.helpers.getSquare());
      } else if( event.code === 'Enter'){
        
        this.addOrder()
        
  
      }else if(event.code === 'Space'){
        this.orders = []
      } else { 
  
      }
        }
    
        this.checkIfButtonDisabled()
    } 

  // This function begins the Trip, we go to Trip page and we reset some defaults.
  beginTrip(){
    
    console.log('begintrip')
    this.router.navigateByUrl('trip').then( () => {
      this.helpers.secondsLeft = 4 ;
      // We use an interval to stablish a nice countdown effect on the Trip Page.
      const countDown = setInterval( () => {
        this.helpers.secondsLeft -= 1
      }, 1000 )

      setTimeout( () => { 
        
        // I begin the trip
        this.helpers.trip(this.orders, this.rover, this.helpers.getSquare());
        
        // Here I reset the slide to begin at 0 and set index back to 0;
        this.slides.slideTo(0);
        this.slideIndex = 0;
        
        // We clear the interval;
        clearInterval(countDown)
      }, 4000)
    })
  }




 
  //// ARRAY OF ORDERS RELATED METHODS ////

  clear(){
    // clear input order
    this.orders = [];
    this.checkIfButtonDisabled()
  }

  
  clearLastOrder(){

    this.lastOrder = '';
    this.checkIfButtonDisabled()
  }

  deleteThisOrder(index:number){

    // delete certain order
    this.orders.splice(index, 1);
    this.checkIfButtonDisabled()
  }

  addOrder(){
    // add order to array or orders
    if(this.lastOrder){
      const upper = this.lastOrder.toUpperCase();
      
      if(upper.length === 1){
        if(this.arrayOfAcceptedValues.includes(upper) ){
          this.lastOrder = ''
          this.orders.push(upper);
        }else{
          return
        }
      }else{
        const arrayOfOrders = Array.from(this.lastOrder);
        arrayOfOrders.forEach((order:string)=>{
          this.orders.push(order.toUpperCase())
        })
      }
      
    }
    this.checkIfButtonDisabled()
  }

   //// ARRAY OF ORDERS RELATED METHODS ////





  
  updateSquare(ev){
    this.helpers.square[ev.what] = parseInt(ev.ev) ? parseInt(ev.ev) : 0;
  }

  initialOrientationOfRover(ev){
    // setup of the initial orientation of rover

    this.rover['orientation'] = ev;
    this.helpers.roverMovement.next(this.rover);
    this.checkIfButtonDisabled()
  }
  
  resetRoverToZeroZero(){

    // initial setups 
    const initialRoverPosition: Rover =  {
      direction: 'R',
      coordinates: { xWidth: 0, yHeight: 0 },
      orientation: 'N',
      successTrip: true
    }

    // we reset the object rover, just in case
    this.rover ={ ... initialRoverPosition } 

    // we update the observable of rover, just in case
    this.helpers.roverMovement.next(this.rover);
    
    
  }
  
  
 
  //// SLIDER RELATED METHODS ////
  
  async slideNext(){

    // trigger action of changing to next slide programmatically

    await this.slides.slideNext();
    this.slides.getActiveIndex().then((index:number)=>{

      // we reset index and we reset the rover object to initial setup

      this.slideIndex = index
      if(this.slideIndex === 1){
        this.resetRoverToZeroZero()
        
      }
    })

    // we check if we must disable button or not
    this.checkIfButtonDisabled();
  }
  
  async slideChanged(){
    
    // actions to be taken every time slide has changed, get index
    this.slideIndex = await this.slides.getActiveIndex();

    // check if button of next should disable
    this.checkIfButtonDisabled()

    if(this.slideIndex === 1){

      // only when we come back, reset the array of orders and the input of last order
      this.orders = [];
      this.lastOrder = ''
    }
    
  }

  //// SLIDER RELATED METHODS ////





/// INITIAL SETUP AND OTHERS /////

 
  
  checkIfButtonDisabled(){
    
    // here we check if we should disable or not the NEXT button
    
    if( this.slideIndex < 2 ){
      this.disabledButton = ! ( this.inSquareHeight && this.inSquareWidth);
    }else{
      
      this.disabledButton = ! ( this.orders.length > 0);
      
    }
  }


  
  initialCoordinatesOfRover(ev){

    // set initial coordinates of rover

    const coordNumb = parseInt(ev.ev) ? parseInt(ev.ev) : 0;
    const name = ev.what === 'height' ? 'yHeight' : 'xWidth';
    this.rover.coordinates[name] = coordNumb;

    // check if coordiantes are in range and we use inSquareWidth and Height to persist the data 

    if(this.helpers.checkIfInsideSquare(this.helpers.getSquare(), this.rover.coordinates)){
      this.inSquareHeight = this.inSquareWidth = true;
      this.helpers.roverMovement.next(this.rover);
    } else{
      if(this.rover.coordinates.xWidth >= this.helpers.getSquare().width){
        this.inSquareWidth = false;
      }else{
        this.inSquareWidth = true;
      }
      
      if(this.rover.coordinates.yHeight >= this.helpers.getSquare().height){
        this.inSquareHeight = false;
      }else{
        this.inSquareHeight = true;
      }
      
      
    }
    
    this.checkIfButtonDisabled()
    
    
  }

  // KEYBOARD



}
