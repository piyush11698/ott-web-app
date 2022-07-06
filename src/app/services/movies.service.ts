import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../movies';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseApiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.baseApiUrl);
  }

  getMovieById(id: any): Observable<any> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.http.get(url);
  }

  updateMovie(movie: Movies): Observable<Movies> {
    const url = `${this.baseApiUrl}/${movie.id}`;
    return this.http.put<Movies>(url, movie, httpOptions);
  }

  addMovie(movie: Movies): Observable<Movies> {
    const url = `${this.baseApiUrl}`;
    return this.http.post<Movies>(url, movie, httpOptions);
  }
}
