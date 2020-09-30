import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../_models/movie';
import { AlertifyService } from '../_services/alertify.service';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  //movie: Movie;
  movie:any;

  constructor(private movieService: MovieService, private http: HttpClient,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMovie();
  }

  loadMovie(){
    this.http.get('http://localhost:5000/api/movies/'+this.route.snapshot.params['id']).subscribe(response=>{
      this.movie = response;
    },error=>{
      this.alertify.error(error);
    });
    }
    //this.movieService.getMovie(+this.route.snapshot.params['id'])
}
