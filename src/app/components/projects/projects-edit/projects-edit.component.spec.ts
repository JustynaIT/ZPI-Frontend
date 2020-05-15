import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEditComponent } from './projects-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectsService } from 'src/app/services/projects.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProjectsEditComponent', () => {
  let component: ProjectsEditComponent;
  let fixture: ComponentFixture<ProjectsEditComponent>;
  let projectsS;
  let router;
  let snackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [ ProjectsService],
      declarations: [ ProjectsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsEditComponent);
    component = fixture.componentInstance;
    projectsS = TestBed.get(ProjectsService);
    snackBar = TestBed.get(MatSnackBar);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    const project = {
      name: 'name',
      budget: 1000,
    };
    const getSpy = spyOn(projectsS, 'get').and
      .callFake(() => of(project));

    component.ngOnInit();
    expect(getSpy).toHaveBeenCalled();
    expect(component.EditProjectForm.value).toEqual(project);
  });

  it('#editProject should create project', () => {
    const createSpy = spyOn(projectsS, 'edit').and
      .callFake(() => of(undefined));
    const navigateSpy = spyOn(router, 'navigate');
    const openSpy = spyOn(snackBar, 'open');

    component.EditProjectForm.controls['name'].setValue('project');
    component.EditProjectForm.controls['budget'].setValue(1000);

    component.editProject();
    expect(createSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/projects']);
  });

  it('#editProject should no create project', () => {
    const createSpy = spyOn(projectsS, 'edit').and
      .callFake(() => of(undefined));
    const navigateSpy = spyOn(router, 'navigate');
    const openSpy = spyOn(snackBar, 'open');

    component.editProject();
    expect(createSpy).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
