/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { Coordinates, Rover, Square } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  square: Square = {
    width: 250,
    height: 300
  };

  constructor() { }

  isInsideSquare(coordinates: Coordinates) {
    const maxWidth = this.square.width;
    const maxHeight = this.square.height;

    return (coordinates.x <= maxWidth && coordinates.y <= maxHeight) && (coordinates.x >= 0 && coordinates.y >= 0)? true :  false;
  }

  /* funcion de pedro
    checkIfInsideSquare(square: Square , coordinates: Coordinates ): boolean {
      const maxWidth = square.width; // The max width of the square will be the width of the square.
      const maxHeight = square.height; // The max height of the square will be the height of the square.

      // so we check if coordinates are within those boundaries and also positive number
      return ( coordinates.xWidth <= maxWidth )
      && ( coordinates.yHeight <= maxHeight )
      && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 )
    }
  */

  //método que reciba como parámetro hacia donde girar, comprobando la orientación actual
  //un switch?
  //orientación inicial: N, si recibo L voy a W y devuelvo la orientación final como W
  //si recibo una A, N.
  //si recibo una R, E.
  changeOrientation(orientation: 'N'|'S'|'E'|'W', command: 'A'|'L'|'R' ): 'N'|'S'|'E'|'W'{
    switch (command) {
      case 'A':
      return orientation = orientation;

      case 'L':
        if(orientation === 'N') {
          orientation = 'W';
        } else if (orientation === 'E') {
          orientation = 'N';
        } else if (orientation === 'W') {
          orientation = 'S';
        } else { orientation = 'E'; };
      return orientation;

      case 'R':
        if(orientation === 'N') {
          orientation = 'E';
        } else if (orientation === 'E') {
          orientation = 'S';
        } else if (orientation === 'W') {
          orientation = 'N';
        } else { orientation = 'W'; };
      return orientation;
    }
    /* funcion original reemplaza orientation por rover.orientation y le pasas el rover en lugar de la orientacion */
  }

  /*
    changeOrientation2(direction: 'A'|'L'|'R', orientation: 'N'|'S'|'E'|'W'): 'N'|'S'|'E'|'W' {
    const orientationArr = ['N', 'S', 'W', 'E'];
    let newOrientation = orientationArr.indexOf(orientation);

    return orientation;
  }
  */

  //una vez dada la orden que diga la nueva coordenada donde va a ir
  getNewCoordinateWhereIWantToGo(orientation: 'N'|'S'|'E'|'W'): Coordinates {
    /* INFO:
      cuando se mueva hacia el norte y hacia el este será +1
      cuando se mueva hacia el sur y hacia el oeste será -1
      if que limite que siempre sean positivo (0,0);
      recibiendo orientacion, x = este / oeste, y = norte / sur
    */
    let coordinate: Coordinates;

    if(orientation === 'N' || orientation === 'S') {
      coordinate.y = orientation === 'N'? coordinate.y++ : coordinate.y--;
    } else {
      coordinate.x = orientation === 'E'? coordinate.x++ : coordinate.x--;
    }

    return coordinate;
  }

  // parametros Square, direccion, rover (dentro ya viene la orientacion)
  // funcion de moverse: evalúe si la posición futura está dentro o no del cuadrado
  // si esta dentro del cuadrado me voy a mover, si no está dentro devolverá false;
  moveRover(rover: Rover, command: 'A'|'L'|'R'): Rover{
    const orientation = this.changeOrientation(rover.orientation, command);
    rover.coordinates = this.getNewCoordinateWhereIWantToGo(orientation);
    const insideSquare = this.isInsideSquare(rover.coordinates);

    if(insideSquare) { //dentro del cuadrado: moverse
      rover.sucessTrip = true;
      return rover;

    } else {
      rover.sucessTrip = false;
      return rover;
    }
  }

}
