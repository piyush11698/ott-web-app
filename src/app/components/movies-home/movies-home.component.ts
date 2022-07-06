import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/movies';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss']
})
export class MoviesHomeComponent implements OnInit {
  movies: Movies[] = [];
  filteredMovies: Movies[] = [];
  searchedMovies: Movies[] = [];
  yetToWatchMovies: Movies[] = [];
  watchedMovies: Movies[] = [];
  defaultGenre: string = 'All';
  movieSearch: string = '';
  isMovieSearched: boolean = false;
  genresList: any = [
    { genreName: "All", active: true },
    { genreName: "Action", active: false },
    { genreName: "Horror" },
    { genreName: "Thriller" },
    { genreName: "Comedy" },
    { genreName: "Fantasy" },
    { genreName: "Drama" },
  ];

  constructor(private moviesService: MoviesService,private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.yetToWatchMovies = this.movies.filter((m) => !m.isFav && !m.isWatched);
      this.watchedMovies = this.movies.filter((m) => m.isWatched);
    });
  }

  ngDoCheck(): void {
    this.onFilter(this.defaultGenre);
  }

  onFilter(genreName: string): void {
    this.genresList = this.genresList.map((gl: any) => {
      if (gl.genreName === genreName) {
        return { ...gl, active: true }
      }

      return { ...gl, active: false }
    });
    const result = this.searchedMovies.length || this.isMovieSearched ? this.searchedMovies : this.movies;
    this.defaultGenre = genreName;
    this.filteredMovies = genreName === 'All' ? result : result.filter((movie) => movie.genre.toLowerCase() === genreName.toLowerCase());
    if (this.filteredMovies.length > 0){
      this.yetToWatchMovies = this.filteredMovies.filter((m) => !m.isFav && !m.isWatched);
      this.watchedMovies = this.filteredMovies.filter((m) => m.isWatched);
    } else {
      this.yetToWatchMovies = [];
      this.watchedMovies = [];
    }
  }

  searchMovie(): void {
    this.searchedMovies = this.movies.filter((m) => m.title.toLowerCase().includes(this.movieSearch.toLowerCase()));
    if (this.searchedMovies.length === 0 && this.movieSearch) {
      this.isMovieSearched = true;
    } else {
      this.isMovieSearched = false;
    }
  }

  onFavClick(movie: Movies): void {
    if(this.auth.isUserLoggedIn())
      {
        this.moviesService.updateMovie({...movie, isFav: !movie.isFav, isWatched: true})
      .subscribe((updatedMovie) => {
        this.movies = this.movies.map((m) => {
          if (m.id === updatedMovie.id) {
            return updatedMovie;
          }

          return m;
        });
      });
    }
    else if(this.auth.isAdminLoggedIn()){
      this.router.navigate(['home']);
    }
    else{
      this.router.navigate(['login']);
    }
  }

  onWatchedClick(movie: Movies): void {
    if(this.auth.isUserLoggedIn())
      {
    const payloadMovie = { ...movie, isWatched: !movie.isWatched };
    payloadMovie.isFav = payloadMovie.isWatched ? payloadMovie.isFav : false;
    this.moviesService.updateMovie(payloadMovie).subscribe((updatedMovie) => {
      this.movies = this.movies.map((m) => {
        if (m.id === updatedMovie.id) {
          return updatedMovie;
        }

        return m;
      });
    });
      } 
      else if(this.auth.isAdminLoggedIn()){
        this.router.navigate(['home']);
      }
    else{
  this.router.navigate(['login']);
    }
  }
}
