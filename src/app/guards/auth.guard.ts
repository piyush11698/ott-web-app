
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isUserLoggedIn() && !this.auth.isAdminLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.auth.isUserLoggedIn() || this.auth.isAdminLoggedIn();
  }
}
