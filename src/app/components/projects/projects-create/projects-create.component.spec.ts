import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCreateComponent } from './projects-create.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsCreateComponent', () => {
  let component: ProjectsCreateComponent;
  let fixture: ComponentFixture<ProjectsCreateComponent>;
  let projectsS;
  let snackBar;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [ ProjectsService],
      declarations: [ ProjectsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsCreateComponent);
    component = fixture.componentInstance;
    projectsS = TestBed.get(ProjectsService);
    snackBar = TestBed.get(MatSnackBar);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addProject should create project', () => {
    const createSpy = spyOn(projectsS, 'create').and
      .callFake(() => of(undefined));
    const navigateSpy = spyOn(router, 'navigate');
    const openSpy = spyOn(snackBar, 'open');

    component.AddProjectForm.controls.name.setValue('project');
    component.AddProjectForm.controls.budget.setValue(1000);

    component.addProject();
    expect(createSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/projects']);
  });

  it('#addProject should no create project', () => {
    const createSpy = spyOn(projectsS, 'create').and
      .callFake(() => of(undefined));
    const navigateSpy = spyOn(router, 'navigate');
    const openSpy = spyOn(snackBar, 'open');

    component.addProject();
    expect(createSpy).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
