import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(environment.api + '/tasks')
    .pipe(
      map((res: any) =>  res.data)
      );
  }

  public getTasksCurrentUser() {
    return this.http.get(environment.api + `/user/tasks`)
    .pipe(
      map((res: any) => res.data)
    );
  }

  public getProjectTasks(id: number) {
    return this.http.get(environment.api + `/projects/${id}/tasks`)
    .pipe(
      map((res: any) => res.data)
    );
  }

  public get(id: number) {
    return this.http.get(environment.api + `/tasks/${id}`)
    .pipe(
      map((res: any) => res.data)
    );
  }

  public create(task: any) {
    return this.http.post(environment.api + '/tasks', task);
  }

  public edit(id: number, task: any) {
    return this.http.patch(environment.api + `/tasks/${id}`, task);
  }

  public delete(id: number) {
    return this.http.delete(environment.api + `/tasks/${id}`);
  }
}
