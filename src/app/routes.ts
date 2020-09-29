import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TblmovieComponent } from './tblmovie/tblmovie.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tblmovie', component: TblmovieComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
