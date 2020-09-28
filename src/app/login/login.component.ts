import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { cwd } from 'process';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any = {};
  constructor(private authService: AuthService) { }
  @Output() loggedIn = new EventEmitter();
  @Output() userName = new EventEmitter();

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
      this.loggedIn.emit(true);
      this.userName.emit(this.model.username);
    },error => {
        console.log('failed to login');
    });
  }
}
