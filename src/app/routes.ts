import { Routes } from '@angular/router';
import { AdminComponent } from './Admin/Admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RegisterComponent } from './register/register.component';
import { TblmovieComponent } from './tblmovie/tblmovie.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'movies', component: TblmovieComponent, canActivate: [AuthGuard] },
    { path: 'movies/:id', component: MovieDetailComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
