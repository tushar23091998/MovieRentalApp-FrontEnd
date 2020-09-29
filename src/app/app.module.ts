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
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [						
    AppComponent,
    TblmovieComponent,
      NavComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      MovieCarouselComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    //BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
