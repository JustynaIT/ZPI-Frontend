import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
    return false;
  }

  public signIn(user: any) {
    return this.http.post(environment.api + '/login', user);
  }


}
