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
  model :any = {}
  addMode : any = true;
  deleteMode:any;
  constructor(private http:HttpClient, private userService: UserService, 
    private alertify: AlertifyService,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  deleteToggle(){
    this.addMode = false;
    this.deleteMode =true;
  }

  addToggle()
  {
    this.addMode = true;
    this.deleteMode =false;
  }

  addMovie(model :any){
    this.http.post('http://localhost:5000/api/movies',model).subscribe(() => {
          this.alertify.success('Movie added successfully');
        }, error => {
          console.log(error);
          this.alertify.error(error);
      });
      
  }


}
