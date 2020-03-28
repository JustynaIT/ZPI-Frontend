import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

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
    return this.http.post(environment.api + '/login', user);
  }

  public getUser() {
    return this.http.get(environment.api + '/user');
  }

  public addUser(newUser: any) {
    return this.http.post(environment.api + '/register', newUser)
      .pipe(catchError(this.handleError));
  }

  handleError(error): ObservableInput<any> {
    if (error.code === 500) {
      //this.router.navigate(['/login']);
    } else {
      return throwError(error)
    }
}


}
