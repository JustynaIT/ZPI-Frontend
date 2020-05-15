import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsShowComponent } from './projects-show.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { of } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';
import { TasksComponent } from '../tasks/tasks/tasks.component';

describe('ProjectsShowComponent', () => {
  let component: ProjectsShowComponent;
  let fixture: ComponentFixture<ProjectsShowComponent>;
  let projestsS;
  let tasksS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsShowComponent, TasksComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [ ProjectsService, TasksService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsShowComponent);
    component = fixture.componentInstance;
    projestsS = TestBed.get(ProjectsService);
    tasksS = TestBed.get(TasksService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    const fetchProjectSpy = spyOn<any>(component, 'fetchProject').and
      .callFake(() => undefined);
    const fetchTasksSpy = spyOn<any>(component, 'fetchTasks').and
      .callFake(() => undefined);

    component.ngOnInit();
    expect(fetchProjectSpy).toHaveBeenCalled();
    expect(fetchTasksSpy).toHaveBeenCalled();
  });

  it('#fetchProject should id === null', () => {
    const project = {
      id: 1,
      name: 'name',
    };
    const getProjectCurrentUserSpy = spyOn(projestsS, 'getProjectCurrentUser').and
      .callFake(() => of(project));
    const fetchUsersProject = spyOn<any>(component, 'fetchUsersProject').and
      .callFake(() => undefined);

    (component as any).fetchProject(null);
    expect(getProjectCurrentUserSpy).toHaveBeenCalled();
    expect(fetchUsersProject).toHaveBeenCalled();
    expect(component.project).toEqual(project);
  });

  it('#fetchProject should id !=== null', () => {
    const project = {
      id: 1,
      name: 'name',
    };
    const getSpy = spyOn(projestsS, 'get').and
      .callFake(() => of(project));
    const fetchUsersProject = spyOn<any>(component, 'fetchUsersProject').and
      .callFake(() => undefined);

    (component as any).fetchProject(1);
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith(1);
    expect(fetchUsersProject).toHaveBeenCalled();
    expect(component.project).toEqual(project);
  });

  it('#fetchUsersProject', () => {
    const users = [{
      name: 'name',
    }];
    const getUsersProjectSpy = spyOn(projestsS, 'getUsersProject').and
      .callFake(() => of(users));

    component.project = { id: 1 };
    (component as any).fetchUsersProject();
    expect(getUsersProjectSpy).toHaveBeenCalled();
    expect(getUsersProjectSpy).toHaveBeenCalledWith(1);
    expect(component.usersProject).toEqual(users);
  });

  it('#fetchTasks should id === null', () => {
    const tasks = { data: [
      { name: 'name'},
      { name: 'name2'},
    ]};
    const getTasksCurrentUserSpy = spyOn(tasksS, 'getTasksCurrentUser').and
      .callFake(() => of(tasks));

    // setPaginator
    component.idProject = null;
    (component as any).fetchTasks();
    expect(getTasksCurrentUserSpy).toHaveBeenCalled();
    expect(getTasksCurrentUserSpy).toHaveBeenCalledWith(1);
    //expect(component.tasks).toEqual(tasks.data);
  });

});
