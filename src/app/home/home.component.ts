import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  loginMode=false;
  homeMode=true;
  movieMode=false;
  signedIn = false;
  tblmovies:any;
  varname = null;
  jwtHelper = new JwtHelperService();
  constructor(public http:HttpClient, private alertify:AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.getValues();
    const token = sessionStorage.getItem('token');
    if(token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.signedIn=true;
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  getValues(){
    this.http.get('http://localhost:5000/api/tblmovies').subscribe(response => {
      this.tblmovies = response;
    }, error =>{
      this.alertify.error(error);
    });
  }

  registerToggle(){
    this.registerMode = true;
    this.loginMode=false;
    this.homeMode=false;
    this.movieMode=false;
  }

  loginToggle(){
    this.registerMode = false;
    this.loginMode=true;
    this.homeMode=false;
    this.movieMode=false;
  }

  movieToggle(){
    this.registerMode = false;
    this.loginMode=false;
    this.homeMode=false;
    this.movieMode=true;
  }

  homeToggle(){
    this.registerMode = false;
    this.loginMode=false;
    this.homeMode=true;
    this.movieMode=false;
  }

  cancelRegisterMode(registerMode:boolean){
    this.registerMode = false;
    this.homeMode = true;
  }

  isLoggedIn(sign : boolean){
    if(sign==true){
      var validToken = this.authService.loggedIn();
       if(validToken == true){
        this.signedIn= true;
        this.homeMode= true;
        this.loginMode= false;
        this.registerMode= false; 
       }
       else if(validToken == false){
        this.signedIn= false;
        this.homeMode= false;
        this.loginMode= true;
        this.registerMode= false;
       }
    }      
  }

  displayUsername(sentUsername : string){
    this.varname=sentUsername
  }

  logout(){
    sessionStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.signedIn=false;
    this.homeMode= true;
    this.loginMode= false;
    this.registerMode= false;
  }
}
