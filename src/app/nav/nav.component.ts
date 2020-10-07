import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { InteractionService } from '../_services/interaction.service';
import { SharedcartService } from '../_services/sharedcart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  signedIn = false;
  movies: any;
  moviesAddedTocart:any;
  cartItemCount:number;
  jwtHelper = new JwtHelperService();
  constructor(private http:HttpClient, private authService: AuthService, private router: Router,private sharedService:SharedcartService
    ,private alertify: AlertifyService, private interactionService: InteractionService, private route: ActivatedRoute) 
    { }

  ngOnInit() {
    //this.getValues();

    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    // this.moviesAddedTocart=this.sharedService.getMoviesFromCart();
    // this.cartItemCount = this.sharedService.getMoviesFromCart().length;
    // this.sharedService.updateCartCount(this.cartItemCount);
    const token = sessionStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.signedIn = true;
    }
    this.interactionService.sharedMessage.subscribe(ifSignedIn => {
      if(ifSignedIn === true){
      var validToken = this.authService.loggedIn();
      if(validToken === true){
        this.signedIn = true;
       }
       else if(validToken === false){
        this.signedIn = false;
       }
    }}
    );    
  }



  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('movies');
    this.alertify.message('Logged out');
    this.signedIn=false;
    this.router.navigate(['/home']);
  }



}
