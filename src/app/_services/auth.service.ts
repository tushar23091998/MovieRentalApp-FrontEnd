import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken:any;

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response:any)=>{
        const user = response;
        if(user){
          sessionStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }
  register(user:User){
    return this.http.post(this.baseUrl + 'register',user);
  }

  loggedIn(){
    const token = sessionStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}