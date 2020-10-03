import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-tblmovie',
  templateUrl: './tblmovie.component.html',
  styleUrls: ['./tblmovie.component.css']
})
export class TblmovieComponent implements OnInit {
  tblmovies: any;
  search;
  constructor(private http: HttpClient,private alertify:AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.http.get('http://localhost:5000/api/movies').subscribe(response => {
      this.tblmovies = response;
    }, error =>{
      this.alertify.error(error);
    });
  }

}
