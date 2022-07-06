import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss']
})
export class AddMoviesComponent implements OnInit {
  movieTitle: string = '';
  movieDescription: string = '';
  movieRating: number = 0;
  movieLanguage: string = '';
  movieGenre: string= '';
  image: string = '';
  isWatched: boolean = false;
  isFav: boolean = false;

  movieTitleErrorMessage: string = '';
  movieDescriptionErrorMessage: string = '';
  movieLanguageErrorMessage: string = '';
  movieGenreErrorMessage: string = '';
  movieImageUrlErrorMessage: string = '';

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.validateMovieTitle();
    this.validateMovieDescription();
    this.validateMovieLanguage();
    this.validateMovieGenre();
    this.validateMovieImageUrl();
    if (this.movieTitle && this.image ) {
      const newMovie: Movies = {
        reviews: [],
        isFav: this.isFav,
        isWatched: this.isWatched,
        image: this.image,
        genre: this.movieGenre,
        language: this.movieLanguage,
        rating: this.movieRating,
        description: this.movieDescription,
        title: this.movieTitle,
        id: Math.round(Math.random() * 100000)
      }
      this.moviesService.addMovie(newMovie).subscribe((movie) => this.router.navigate(['/']));
    }
  }

  validateMovieTitle() {
    const isNotValidString = /\d/.test(this.movieTitle);
    if(isNotValidString) {
      this.movieTitleErrorMessage = 'Movie Title must be a string';
      return;
    }
    if (this.movieTitle.length === 0) {
      this.movieTitleErrorMessage = 'Movie Title is not valid';
      return;
    }
    this.movieTitleErrorMessage = '';
  }

  validateMovieDescription() {
    const isNotValidString = /\d/.test(this.movieDescription);
    if(isNotValidString) {
      this.movieDescriptionErrorMessage = 'Movie Description must be a string';
      return;
    }
    if (this.movieDescription.length === 0) {
      this.movieDescriptionErrorMessage = 'Movie Description is not valid';
      return;
    }
    this.movieDescriptionErrorMessage = '';
  }

  validateMovieLanguage() {
    const isNotValidString = /\d/.test(this.movieLanguage);
    if(isNotValidString) {
      this.movieLanguageErrorMessage = 'Movie Language must be a string';
      return;
    }
    if (this.movieLanguage.length === 0) {
      this.movieLanguageErrorMessage = 'Movie Language is not valid';
      return;
    }
    this.movieLanguageErrorMessage = '';
  }

  validateMovieGenre() {
    const isNotValidString = /\d/.test(this.movieGenre);
    if(isNotValidString) {
      this.movieGenreErrorMessage = 'Movie Genre must be a string';
      return;
    }
    if (this.movieGenre.length === 0) {
      this.movieGenreErrorMessage = 'Movie Genre is not valid';
      return;
    }
    this.movieGenreErrorMessage = '';
  }

  validateMovieImageUrl() {
    const isNotValidString = /\d/.test(this.image);
    if(isNotValidString) {
      this.movieImageUrlErrorMessage = 'Movie Image Url must be a string';
      return;
    }
    if (this.image.length === 0) {
      this.movieImageUrlErrorMessage = 'Movie Image Url is not valid';
      return;
    }
    this.movieImageUrlErrorMessage = '';
  }

}
