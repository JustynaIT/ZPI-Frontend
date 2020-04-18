import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, ObservableInput, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {

  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  role() {
    return localStorage.getItem('roles');
  }


  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public signIn(user: any) {
    return this.http.post(environment.api + '/login', user)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public getUser() {
    return this.http.get(environment.api + '/user')
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public addUser(newUser: any) {
    return this.http.post(environment.api + '/register', newUser)
      .pipe(
        catchError(error => this.error(error))
      );
  }

  error(error) {
    switch (error.error.code) {
      case 401: {
        localStorage.clear();
        this.router.navigate(['']);
        break;
      }
      case 422: {
        break;
      }
      default:
        this.snackBar.open(error.message, 'close', {
        duration: 4000,
        panelClass: ['color-snackbar-error']
      });
    }
    return throwError(error);
  }

  /* handleError(error): ObservableInput<any> {
    if (error.code === 500) {
      //this.router.navigate(['/login']);
    } else {
      return throwError(error)
    }} */

}
