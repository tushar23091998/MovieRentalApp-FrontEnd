import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { tblMovie } from '../_models/tblMovie';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-tblmovie',
  templateUrl: './tblmovie.component.html',
  styleUrls: ['./tblmovie.component.css']
})
export class TblmovieComponent implements OnInit {
  tblmovies: any;
  user: User;
  pagination: Pagination;
   pageNumber=1;
   pageSize=100;
   
   
   movieParams: any={};
  
  search;
  constructor(private http: HttpClient, private route: ActivatedRoute,
    private userService: UserService,private alertify:AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.getValues();
    this.movieParams.orderBy= 'rentalprice';
    this.pagination.currentPage = 0;
    // this.route.data.subscribe(data=>{
    //   this.user = data['user'];
    // });
    //this.loadUserMovies();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  getValues(page?,itemsPerPage?){
    const paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();
    let params = new HttpParams();
    if(page!=null && itemsPerPage!=null){
      params=params.append('pageNumber',page);
      params=params.append('pageSize',itemsPerPage);
    }
    if(this.movieParams!=null){
      params = params.append('orderBy',this.movieParams.orderBy);
    }
    this.http.get('http://localhost:5000/api/movies',{observe: 'response',params}).pipe(
      map(response =>{
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    ).subscribe((response : PaginatedResult<any>) => {
      this.tblmovies = response.result;
      this.pagination = response.pagination;
    }, error =>{
      this.alertify.error(error);
    });
  }

  loadUsers(){
    this.getValues(this.pagination.currentPage,this.pagination.itemsPerPage)
  }

  // loadUserMovies(){
  //   this.http.get('http://localhost:5000/api/users/'+this.authService.decodedToken.nameid).subscribe(response=>{
  //   this.user = response;
  // },error=>{
  //   this.alertify.error(error);
  // }); 
  // }

  //(response : PaginatedResult<any>)
}
