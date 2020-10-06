import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tblMovie } from '../_models/tblMovie';

@Injectable({
  providedIn: 'root'
})
export class SharedcartService {

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();

  constructor() {
   }

  addMovieToCart(movie: any) {
    let movies = [];
    if(sessionStorage.getItem('movies')){
      movies= JSON.parse(sessionStorage.getItem('movies'));
      console.log(movies);
      movies=[...movies,movie]
      console.log(movies);
    }
    else{
      movies=[movie];
      console.log(movies);
    }
    sessionStorage.setItem('movies', JSON.stringify(movies));
  }

  // addMovieToCart(movies: any) {
  //   sessionStorage.setItem('movies', JSON.stringify(movies));
  // }
  getMoviesFromCart() {
    return JSON.parse(sessionStorage.getItem('movies'));
  }
  removeAllMovieFromCart() {
    return sessionStorage.removeItem('movies');
  }

  removeMovieFromCart(movieId: number){
    let moviesInCart = JSON.parse(sessionStorage.getItem('movies'));
    sessionStorage.removeItem('movies');
    //console.log(moviesInCart);
    for (let index = 0; index < moviesInCart.length; index++) {
      //const element = moviesInCart[index];
      if(moviesInCart[index].aMovieId == movieId) {
        moviesInCart.splice(index, 1);
        break;
      }
    }
    for (let index = 0; index < moviesInCart.length; index++) {
      const element = moviesInCart[index];
      this.addMovieToCart(element);
    }
    //console.log(moviesInCart);
  }

  updateCartCount(count: number) {
    this.currentCartCount.next(count);
  }
}
