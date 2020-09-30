import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../_models/movie';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + sessionStorage.getItem('token');
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl =  environment.apiUrl;
constructor(private http: HttpClient) { }

getMovies() : Observable<Movie[]>{
  return this.http.get<Movie[]>(this.baseUrl+'movies');
}

getMovie(id): Observable<Movie>{
  return this.http.get<Movie>(this.baseUrl + 'movies/' +id);
}

}
