import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();
  @Output() loggedIn = new EventEmitter();
  @Output() userName = new EventEmitter();
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(() => {
      console.log('registration succesful');
    }, error => {
      console.log(error);
    });
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
      this.loggedIn.emit(true);
      this.userName.emit(this.model.username);
    },error => {
        console.log('failed to login');
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
