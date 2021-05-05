export interface Square {
    width: number;
    height: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface Rover {
    command: 'A' | 'L' | 'R';
    orientation: 'N' | 'E' | 'S' | 'W';
    coordinates: Coordinates;
    sucessTrip: boolean;
}
