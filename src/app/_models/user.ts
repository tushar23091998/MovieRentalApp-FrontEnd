import { Order } from './order';

export interface User {
    aCustomerId: number;
    aAddress: string;
    age: number;
    aEmail: string;
    aPhone: string;
    aname: string;
    aUsername: string;
    aMoviesRented: number;
    aAdmin: boolean;
    orders?: Order[]; 
}
