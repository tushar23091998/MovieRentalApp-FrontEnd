import { Routes } from '@angular/router';
import { AdminComponent } from './Admin/Admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RegisterComponent } from './register/register.component';
import { TblmovieComponent } from './tblmovie/tblmovie.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './User/User.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movies', component: TblmovieComponent },
    // { path: '' ,
    // runGuardsAndResolvers:'always',
    // canActivate: [AuthGuard],
    // children:[
        { path: 'users', component: UserComponent
        ,resolve: {users: UserListResolver}, canActivate: [AuthGuard]},
        {path: 'user/edit', component: UserEditComponent
        ,resolve: {user: UserEditResolver}
        ,canDeactivate:[PreventUnsavedChanges], canActivate: [AuthGuard]},
        { path: 'admin', component: AdminComponent ,canActivate: [AuthGuard]},
        { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard]},
        { path: 'users/:id', component: UserDetailComponent
        ,resolve: {user: UserDetailResolver}, canActivate: [AuthGuard]},
    // ]
    // },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
