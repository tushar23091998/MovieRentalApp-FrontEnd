import { Routes } from '@angular/router';
import { AdminComponent } from './Admin/Admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RegisterComponent } from './register/register.component';
import { TblmovieComponent } from './tblmovie/tblmovie.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './User/User.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'movies', component: TblmovieComponent },
    { path: 'users', component: UserComponent,canActivate: [AuthGuard]
    ,resolve: {users: UserListResolver}},
    { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard]},
    { path: 'users/:id', component: UserDetailComponent,canActivate: [AuthGuard]
    ,resolve: {user: UserDetailResolver}},
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
