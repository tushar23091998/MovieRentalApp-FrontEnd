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
import { MovieService } from './_services/movie.service';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { MovieDetailResolver } from './_resolvers/movie-detail.resolver';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

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
      MovieDetailComponent,
      UserDetailComponent,
      UserEditComponent
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
    AlertifyService,
    MovieService,
    UserService,
    AuthGuard,
    MovieDetailResolver,
    PreventUnsavedChanges,
    UserDetailResolver,
    UserListResolver,
    UserEditResolver,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
