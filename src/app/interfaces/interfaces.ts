export interface Rover {
    direction: 'L' | 'R' | 'A'   // Direction;
    orientation: 'N' | 'E' | 'S' | 'W' ;
    coordinates: Coordinates; // initial coordinates
    successTrip: boolean; // indicates if it was successfull trip or not
}
export interface Square {
    width: number;
    height: number;
}

export interface Coordinates{
    xWidth: number;
    yHeight: number
}

