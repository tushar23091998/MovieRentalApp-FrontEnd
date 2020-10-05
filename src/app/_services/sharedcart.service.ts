import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedcartService {

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

  constructor() {
   }

  addMovieToCart(movie: any) {
    sessionStorage.setItem('movie', JSON.stringify(movie));
  }
  getMovieFromCart() {
    return JSON.parse(sessionStorage.getItem('movie'));
  }
  removeAllMovieFromCart() {
    return sessionStorage.removeItem('movie');
  }

  updateCartCount(count: number) {
    this.currentCartCount.next(count);
  }
}
