import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getValues();
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
      console.log(error);
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
      const token = localStorage.getItem('token');
      var validToken = !!token;
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
    localStorage.removeItem('token');
    console.log('logged out');
    this.signedIn=false;
    this.homeMode= true;
    this.loginMode= false;
    this.registerMode= false;
  }
}
