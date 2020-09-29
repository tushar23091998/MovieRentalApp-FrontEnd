import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { InteractionService } from '../_services/interaction.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  signedIn = false;
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private interactionService: InteractionService) 
    { }

  ngOnInit() {
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
    this.alertify.message('Logged out');
    this.signedIn=false;
    this.router.navigate(['/home']);
  }
}
