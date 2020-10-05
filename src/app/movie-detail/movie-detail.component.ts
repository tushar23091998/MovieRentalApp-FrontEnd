import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tblMovie } from '../_models/tblMovie';
import { AlertifyService } from '../_services/alertify.service';
import { MovieService } from '../_services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedcartService } from '../_services/sharedcart.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  //movie: Movie;
  movie: any;
  safeUrl: any;
  flag: boolean = false;
  user: any;
  usermovies: any;
  cartItemCount: number = 0;
  @Output() cartEvent = new EventEmitter<number>();
  movieAddedTocart:any;

  constructor(private movieService: MovieService, private http: HttpClient, private sharedService: SharedcartService
  , private alertify: AlertifyService, private route: ActivatedRoute, 
  private authService:AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadMovie();
    this.loadUserMovies();
    // this.route.data.subscribe(data=>{
    //   this.user=data['user'];
    //   // this.usermovies=this.user.tblOrder;
    // });
  }

  loadMovie(){
    this.http.get('http://localhost:5000/api/movies/'+this.route.snapshot.params['id']).subscribe(response=>{
      this.movie = response;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.aTrailerLink);
    },error=>{
      this.alertify.error(error);
    });
    }

    loadUserMovies(){
      this.http.get('http://localhost:5000/api/users/'+this.authService.decodedToken.nameid).subscribe(response=>{
      this.user = response;
    },error=>{
      this.alertify.error(error);
    }); 
    }

    onAddCart(movie: any)
    {
    console.log(movie.aMovieId);
    this.movieAddedTocart = this.sharedService.getMovieFromCart();
    for (let index = 0; index < this.user.tblOrder.length; index++) {
      let element = this.user.tblOrder[index].aMovie.aMovieId;
      if(element === movie.aMovieId)
      {
        this.flag = true;
        console.log(true);
        break;
      }
    }
    console.log(this.flag);
    if(this.movieAddedTocart == null && this.flag == false)
    {
      this.movieAddedTocart = [];
      this.movieAddedTocart.push(movie);
      this.sharedService.addMovieToCart(this.movieAddedTocart);
      this.alertify.success("Movie added to cart successfully");
    }
    else if(this.flag == true){
      this.alertify.warning("Movie already rented by you");
    }
    else
    {
      let tempProduct = this.movieAddedTocart.find(p => p.aMovieId === movie.aMovieId);
      if(tempProduct == null)
      {
        this.movieAddedTocart.push(movie);
        this.sharedService.addMovieToCart(this.movieAddedTocart);
        this.alertify.success("Movie added to cart successfully");
      }
      else
      {
        this.alertify.warning("Movie already in cart");
      } 
    }
    this.cartItemCount = this.movieAddedTocart.length;
    this.sharedService.updateCartCount(this.cartItemCount);
  }
}
    //this.movieService.getMovie(+this.route.snapshot.params['id'])

