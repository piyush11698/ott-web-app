import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  id: any;
  faStar = faStar;
  movieReview: string = '';
  movieReviewError: string= '';

  constructor(
    private moviesService: MoviesService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getMovieDetails(this.id);
    });
  }

  getMovieDetails(id: any): void{
    this.moviesService.getMovieById(id).subscribe((res) => {
      this.movie = res;
    });
  }

  openModal(): void {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(): void {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  onSaveReview(): void {
    const isNotValidString = /\d/.test(this.movieReview);
    if(isNotValidString) {
      this.movieReviewError = 'Review must be a string';
      return;
    }
    if (this.movieReview.length === 0) {
      this.movieReviewError = 'Review is not valid';
      return;
    }
    this.movieReviewError = '';
    this.movie.reviews.push(this.movieReview);
    this.moviesService.updateMovie(this.movie).subscribe((updatedMovie) => {
      if (updatedMovie){
        this.movie = updatedMovie
      } else {
        this.movieReviewError = 'An error occured';
      }
    });
    this.movieReview ='';
    this.closeModal();
  }
}
