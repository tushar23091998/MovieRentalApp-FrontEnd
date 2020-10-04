import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tblMovie } from '../_models/tblMovie';

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

getMovies() : Observable<tblMovie[]>{
  return this.http.get<tblMovie[]>(this.baseUrl+'movies');
}

getMovie(id): Observable<tblMovie>{
  return this.http.get<tblMovie>(this.baseUrl + 'movies/' +id);
}

}
