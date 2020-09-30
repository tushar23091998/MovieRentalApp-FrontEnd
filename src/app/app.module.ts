import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { TblmovieComponent } from './tblmovie/tblmovie.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule , Routes } from '@angular/router';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MovieCarouselComponent } from './movieCarousel/movieCarousel.component';
import { appRoutes } from './routes';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdminComponent } from './Admin/Admin.component';
import { UserComponent } from './User/User.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [									
    AppComponent,
    TblmovieComponent,
      NavComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      MovieCarouselComponent,
      AdminComponent,
      UserComponent,
      MovieDetailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
