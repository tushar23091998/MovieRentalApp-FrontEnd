import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { cwd } from 'process';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { InteractionService } from '../_services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService,
     private router : Router, private interactionService: InteractionService) { }


  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
      this.interactionService.nextMessage(true);
    },error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/home'])
    });
  }
}
