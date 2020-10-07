import { tblMovie } from './tblMovie';

export interface tblOrder {
    AOrderId? : number;
    ACustomerId: number;
    AMovieId: number;
    aRentalOrNot: boolean;
    aOrderedDate: Date;
    aDueDate? : Date;
    aMovie? : tblMovie;
}
