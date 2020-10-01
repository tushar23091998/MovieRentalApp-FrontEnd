import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  users: any;

  constructor(private http:HttpClient, private userService: UserService, private alertify: AlertifyService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    // this.userService.getUsers().subscribe((users: User[])=>{
    //   this.users = users;
    // }, error=>{
    //   this.alertify.error(error);
    // });
    this.http.get('http://localhost:5000/api/users').subscribe(response =>{
      this.users= response;
    }, error=>{
      this.alertify.error(error);
    });
  }
}

