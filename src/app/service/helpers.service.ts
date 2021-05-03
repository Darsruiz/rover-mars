import { Injectable } from '@angular/core';
import { Square, Rover, Coordinates } from '../interfaces/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  public secondsLeft = 3; // used for the countdown
  public arrayOfTrips = [];
  roverMovement = new BehaviorSubject( {
      direction: 'R',
      coordinates: { xWidth: 11, yHeight: 11 },
      orientation: 'S',
      successTrip: true
    }); 

 public rover$: Observable< Rover | any > = this.roverMovement.asObservable(); // observable that will take care of the rover movement

 public stateTrip: 'preparing' | 'ongoing' | 'success' | 'disaster' = 'preparing'; 
 
 public delay:number = 400; // time delay between orders currently not being used for lack of time to implement it

 public square: Square = {
  height: 300,
  width: 500
}
 


constructor( private toaster: ToastController){
}


    setSquare(square: Square){
      this.square = square
    }

    getSquare(){
      return this.square
    }

    // This method will check if the coordinates given are inside the square

      checkIfInsideSquare(square: Square , coordinates: Coordinates ): boolean{

      const maxWidth = square.width; // The max width of the square will be the width of the square.
      const maxHeight = square.height; // The max height of the square will be the height of the square.

      // so we check if coordinates are within those boundaries and also positive number
      return  ( coordinates.xWidth <= maxWidth ) 
      && ( coordinates.yHeight <= maxHeight )
      && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 )
    }

    


    
  //// METHODS THAT HANDLE MOVEMENT OF THE ROVER ON THE SQUARE /////

    
    
    
    // This method will return the actual orientation and the new direction after receiving an order

    changeOrientation( direction: string, orientation: string ):string {
      // we assume the rover can only change orientation when he receives either Left (L) or Right (R) Direction
      
      // const arrayOrientations = ['N', 'E', 'S', 'W']
      if( ( direction === 'L' ) || ( direction === 'R') ){
        switch(orientation) { 
          case 'N': { 
            
            if( direction === 'L'){
              return 'W'
            }else{
              // can only be 'R'
              return 'E'
            }
          } 
          case 'S': { 
            
            if( direction === 'L'){
              return 'E'
            }else{
              // can only be 'R'
              return 'W'
            }
          } 
          case 'E': { 
            if( direction === 'L'){
              return 'N'
            }else{
              // can only be 'R'
              return 'S'
            }
          } 
          case 'W': { 
            if( direction === 'L'){
              return 'S'
            }else{
              // can only be 'R'
              return 'N'
            }
          }
        } 
        
      }else{
        return orientation
      }
    }
    
    //  This method gets me the new coordinates where i want to go and where I should be able to
    //  go if that coordinate is not outside of the square
    
    getNewCoordinateWhereIWantToGo( actualCoordinate: Coordinates, orientation: string ): Coordinates{
      
      switch (orientation){
        case 'N': {
          return {
            xWidth: actualCoordinate.xWidth,
            yHeight: actualCoordinate.yHeight + 1
          }
        }
        
        case 'E': {
          return {
            xWidth: actualCoordinate.xWidth + 1,
            yHeight: actualCoordinate.yHeight
          }
        }
        case 'S': {
          return {
            xWidth: actualCoordinate.xWidth,
            yHeight: actualCoordinate.yHeight -1
          }
        }
        case 'W': {
        return {
          xWidth: actualCoordinate.xWidth - 1,
          yHeight: actualCoordinate.yHeight
        }
      }
    }
  }


  
  // This method moves the rover

  moveRover( rover: Rover , direction: string, square: Square ) {
    // I receive an order of type direction;
    // 1. I change the orientation of the rover;
    if( direction === 'L' || direction === 'R') {
      rover.orientation = this.changeOrientation(direction, rover.orientation) as 'N' | 'S' | 'W' | 'E'  
      
      return rover;
    }else{
      // I want to check first if is possible to go there;
      const targetCoordinates = this.getNewCoordinateWhereIWantToGo(rover.coordinates, rover.orientation)
      if( this.checkIfInsideSquare(square, targetCoordinates)){
        
        // is allowed to go so let's execute the method move;
        
        rover.coordinates = targetCoordinates;
        this.roverMovement.next(rover);
        // return rover
        
      }else{
        
        // is not allowed to move because it's outside
        rover.successTrip = false;
        this.roverMovement.next(rover);
        this.stateTrip = 'disaster'
      }
    }
  }
  
  
  // Begins the trip

  async trip( directions: string[], rover: Rover, square: Square){
    
    try{
      // we use a promise to track all the steps since we add some delay effect

      const resulawait = await this.promiseOfSteps(directions, rover, square);

      // if the outcome is true, the trip was successfull, otherwise was a disaster
      resulawait ? this.stateTrip = 'success' : this.stateTrip = 'disaster';
      
    }catch(e){
      this.stateTrip = 'disaster';
    }
    
  }
  
  
  // I had to create a promise in order to await for the setTimeouts inside of the forEach to
  // execute their orders. This is completely unnecessary but I added it because adds a nice 
  // arcade effect on the movement, rather than an instanct execution than the forEach.

  promiseOfSteps(directions: string[], rover: Rover, square:Square){
    this.stateTrip = 'ongoing';
    let delay = 300;
    return new Promise((response,rej)=>{
      try{
        // Iterate over the directions array
        directions.forEach((direction: 'L' | 'R' | 'A', index:number)=>{

          // we add some incremental timeout to get nice delay effect

          delay += this.delay;

          
          setTimeout(()=>{
            if(this.stateTrip === 'ongoing'){
              
              // if the previous step was ok, we set the order to move the rover

              this.moveRover(rover, direction, square );
            }else{
              
              this.stateTrip = 'disaster'
            }
            
            if(directions.length === (index+1)) {

              // this means is the last execution of the bucle so here we end the promise successfully;
              // if was a disaster we return a false, if was successfull we return a TRUE

              const res = !(this.stateTrip === 'disaster') 
              response(res);
            }
          }, delay)
        })
      }catch(e){
        // there was some error
        rej(e)
      }
      
    })
  }

  //// METHODS THAT HANDLE MOVEMENT OF THE ROVER ON THE SQUARE /////







/// METHODS NOT IMPORTANT THAT HANDLE THINGS LIKE TOASTERS...
  
  async presentToast(message: string, color: string, duration:number) {
    const toast = await this.toaster.create({
      message: message,
      duration, color
    });
    toast.present();
  }


  // Tthis method converts the keyboard keys to actual orders

  convertEventsToDirections(event: any){
    switch (event.code) {
      case 'ArrowUp':{
        return 'A';
      }
      case 'ArrowLeft':{
        return  'L'
      }
      case 'ArrowRight':{
        return  'R'
      }
      default:{
        return
      }
    }
  }


  
  /// KEYBOARD RELATED METHODS //
  
  isAcceptedArrow(event: any){
    return event.code === 'ArrowUp' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' 
  }
      
  isAcceptedKey(key){
    return  (  key === 'A' )|| (key === 'L' )||( key === 'R')
  }
  
      /// KEYBOARD RELATED METHODS //
      


 
}
