import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { cwd } from 'process';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};
  constructor(private authService: AuthService, private alertify:AlertifyService) { }
  @Output() loggingIn = new EventEmitter();
  @Output() userName = new EventEmitter();

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
      this.loggingIn.emit(true);
      this.userName.emit(this.model.username);
    },error => {
      this.alertify.error(error);
    });
  }
}
