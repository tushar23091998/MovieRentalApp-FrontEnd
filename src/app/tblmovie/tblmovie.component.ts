import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tblmovie',
  templateUrl: './tblmovie.component.html',
  styleUrls: ['./tblmovie.component.css']
})
export class TblmovieComponent implements OnInit {
  tblmovies: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.http.get('http://localhost:5000/api/tblmovies').subscribe(response => {
      this.tblmovies = response;
    }, error =>{
      console.log(error);
    });
  }

}
