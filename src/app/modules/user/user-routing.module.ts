import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoviesComponent } from 'src/app/components/add-movies/add-movies.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MovieDetailComponent } from 'src/app/components/movie-detail/movie-detail.component';
import { MoviesHomeComponent } from 'src/app/components/movies-home/movies-home.component';

const routes: Routes = [
  { path: "", redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MoviesHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/movies/:id', component: MovieDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
