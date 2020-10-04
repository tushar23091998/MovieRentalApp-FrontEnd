import { tblMovie } from './tblMovie';

export interface tblOrder {
    aRentalOrNot: boolean;
    aOrderedDate: Date;
    aDueDate: Date;
    aMovie: tblMovie;
}
