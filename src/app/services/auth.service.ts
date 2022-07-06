import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdminLoggedIn(){
    return this.getToken() == 'abcdefghijklmnopqrstuvwxyz';
  }

  isUserLoggedIn() {
    return this.getToken() == 'qwertyuiop';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Piyush Arora', email: 'admin@gmail.com' });
    }
    else if (email === 'user@gmail.com' && password === 'user123') {
        this.setToken('qwertyuiop');
        return of({ name: 'Arora Piyush', email: 'user@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}
