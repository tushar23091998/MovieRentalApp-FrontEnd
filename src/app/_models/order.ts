import { Movie } from './movie';

export interface Order {
    aRentalOrNot: boolean;
    aOrderedDate: Date;
    aDueDate: Date;
    aMovie: Movie[];
}
