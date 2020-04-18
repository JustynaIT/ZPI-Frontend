import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  public getAll() {
    return this.http.get(environment.api + '/projects')
    .pipe(
      map((res: any) =>  res.data),
      catchError(error => this.error(error))
      );
  }

  public getProjectCurrentUser() {
    return this.http.get(environment.api + `/user/project`)
    .pipe(
      map((res: any) => res.data),
      catchError(error => this.error(error))
    );
  }

  public getUsersProject(id: number) {
    return this.http.get(environment.api + `/projects/${id}/users`)
    .pipe(
      map((res: any) => res.data),
      catchError(error => this.error(error))
    );
  }

  public get(id: number) {
    return this.http.get(environment.api + `/projects/${id}`)
    .pipe(
      map((res: any) => res.data),
      catchError(error => this.error(error))
    );
  }

  public getRaport(id: number, startDate: string, endDate: string ) {
    return this.http.get(environment.api + `/projects/${id}?date_start=${startDate}&date_end=${endDate}`)
    .pipe(
      map((res: any) => res.data),
      catchError(error => this.error(error))
    );
  }

  public create(project: any) {
    return this.http.post(environment.api + '/projects', project)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public edit(id: number, project: any) {
    return this.http.patch(environment.api + `/projects/${id}`, project)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public delete(id: number) {
    return this.http.delete(environment.api + `/projects/${id}`)
    .pipe(
      catchError(error => this.error(error))
    );
  }
  // 409 add error info

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
}
