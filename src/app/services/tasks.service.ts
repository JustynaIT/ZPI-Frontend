import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  public getAll() {
    return this.http.get(environment.api + '/tasks')
    .pipe(
      map((res: any) =>  res.data),
      catchError(error => this.error(error))
      );
  }

  public getTasksCurrentUser(page?: number) {
    return this.http.get(environment.api + `/user/tasks?page=${page}`)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public getProjectTasks(id: number, page?: number) {
    return this.http.get(environment.api + `/projects/${id}/tasks?page=${page}`)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public get(id: number) {
    return this.http.get(environment.api + `/tasks/${id}`)
    .pipe(
      map((res: any) => res.data),
      catchError(error => this.error(error))
    );
  }

  public create(task: any) {
    return this.http.post(environment.api + '/tasks', task)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public edit(id: number, task: any) {
    return this.http.patch(environment.api + `/tasks/${id}`, task)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public delete(id: number) {
    return this.http.delete(environment.api + `/tasks/${id}`)
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
}
