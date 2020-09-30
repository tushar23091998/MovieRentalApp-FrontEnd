import { Order } from './order';

export interface User {
    aCustomerId: number;
    aAddress: string;
    aAge: number;
    aEmail: string;
    aPhone: string;
    aName: string;
    aUserName: string;
    aMoviesRented: number;
    aAdmin: boolean;
    orders?: Order[]; 
}
