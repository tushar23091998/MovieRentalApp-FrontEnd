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

  tblmovies:any;

  constructor(public http:HttpClient, private alertify:AlertifyService, private authService: AuthService) { }

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
      this.alertify.error(error);
    });
  }

}
