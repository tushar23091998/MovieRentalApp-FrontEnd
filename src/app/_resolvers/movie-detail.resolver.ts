import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../_models/movie';
import { AlertifyService } from '../_services/alertify.service';
import { MovieService } from '../_services/movie.service';

@Injectable()
export class MovieDetailResolver implements Resolve<Movie>{
    constructor(private movieService: MovieService,
        private router: Router, 
        private alertify: AlertifyService){}
            resolve(route: ActivatedRouteSnapshot): Observable<Movie>{
                return this.movieService.getMovie(route.params['id']).pipe(
                    catchError(error=>{
                        this.alertify.error('Problem getting data');
                        this.router.navigate(['/movies']);
                        return of(null);
                    })
                );
            }
    
}