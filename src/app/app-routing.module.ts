import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoviesComponent } from './components/add-movies/add-movies.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesHomeComponent } from './components/movies-home/movies-home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MoviesHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/movies/:id', component: MovieDetailComponent },
  { path: 'addMovie', component: AddMoviesComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
