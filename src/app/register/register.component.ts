import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { InteractionService } from '../_services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService : AuthService,private alertify:AlertifyService,
     private router : Router, private interactionService: InteractionService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registered Successfully');
      this.authService.login(this.model).subscribe(next => {
        this.interactionService.nextMessage(true);
        this.router.navigate(['/home']);
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(){
    this.router.navigate(['/home'])
  }

}
