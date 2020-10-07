import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedcartService } from './_services/sharedcart.service';
//import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 //jwtHelper = new JwtHelperService();

  constructor(private authService : AuthService, private sharedService: SharedcartService){}
  moviesAddedTocart:any;
  cartItemCount:any;
  ngOnInit(){
    this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    if(this.moviesAddedTocart == null){
      this.sharedService.updateCartCount(0);
    }
    else{
      this.cartItemCount = this.sharedService.getMoviesFromCart().length;
      this.sharedService.updateCartCount(this.cartItemCount);
    }

    // const token = localStorage.getItem('token');
    // if(token){
    //   this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    // }
  }
}
