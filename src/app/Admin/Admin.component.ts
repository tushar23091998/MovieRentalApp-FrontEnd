import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private http:HttpClient, private userService: UserService, 
    private alertify: AlertifyService,private route: ActivatedRoute) { }

  ngOnInit() {

    
  }

  showUsers()
  {

  }


}
