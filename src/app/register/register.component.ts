import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  @Output() loggingIn = new EventEmitter();
  @Output() userName = new EventEmitter();
  constructor(private authService : AuthService,private alertify:AlertifyService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registered Successfully');
      this.authService.login(this.model).subscribe(next => {
        //this.alertify.success('logged in successfully');
        this.loggingIn.emit(true);
        this.userName.emit(this.model.username);
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
