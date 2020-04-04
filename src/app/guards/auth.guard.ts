import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const roles = route.data.roles as Array<string>;

    if (this.authService.isAuthenticated() && roles.includes(this.authService.role())) {
      return true;
    }
    this.router.navigate(['']);
    this.snackBar.open(' You are not authorized to enter this page', 'close', {
      duration: 4000,
      panelClass: ['color-snackbar-error']
    });
    return false;
  }

}
