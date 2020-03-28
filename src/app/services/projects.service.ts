import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.api + '/projects')
    .pipe(
      map((res: any) =>  res.data)
      );
  }

  get(id: number) {
    return this.http.get(environment.api + `/projects/${id}`)
    .pipe(
      map((res: any) => res.data)
    );
  }

  create(project: any) {
    return this.http.post(environment.api + '/projects', project);
  }

  edit(id: number, project: any) {
    return this.http.patch(environment.api + `/projects/${id}`, project);
  }

  delete(id: number) {
    return this.http.delete(environment.api + `/projects/${id}`);
  }
  // 409 add error info
}
