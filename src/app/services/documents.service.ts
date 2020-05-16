import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

   public get(id) {
    return this.http.get(environment.api + `/projects/${id}/documents`)
    .pipe(
      catchError(error => this.error(error))
      );
  }

  public create(document: any) {
    return this.http.post(environment.api + '/documents', document)
    .pipe(
      catchError(error => this.error(error))
    );
  }

  public delete(id) {
    return this.http.delete(environment.api + `/documents/${id}`)
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
