import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRaportComponent } from './projects-raport.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatSnackBarModule, MatDatepickerModule,
  DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS,
  MatDialogModule, MatTableModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { of } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import * as _moment from 'moment';

describe('ProjectsRaportComponent', () => {
  let component: ProjectsRaportComponent;
  let fixture: ComponentFixture<ProjectsRaportComponent>;
  let projectsS;

  const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsRaportComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        ProjectsService,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsRaportComponent);
    component = fixture.componentInstance;
    projectsS = TestBed.get(ProjectsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    const fetchProjectSpy = spyOn<any>(component, 'fetchProject')
      .and.callFake(() => undefined );

    component.ngOnInit();
    expect(fetchProjectSpy).toHaveBeenCalled();
  });

  it('#fetchProject', () => {
    const project = {
      id: 1,
      name: 'name',
    };
    const getProjectCurrentUserSpy = spyOn<any>(projectsS, 'getProjectCurrentUser')
      .and.callFake(() => of(project));

    (component as any).fetchProject();
    expect(getProjectCurrentUserSpy).toHaveBeenCalled();
    expect(component.project).toEqual(project);
  });

  it('#getRaport should get report', () => {
    const report = {
      name: 'name',
      report: {
        tasks_between: [{ name: 'name'}],
      }
    };
    const getRaportSpy = spyOn<any>(projectsS, 'getRaport')
      .and.callFake(() => of(report));
    const date = new Date();
    component.raportForm.controls['date_start'].setValue(date);
    component.raportForm.controls['date_end'].setValue(date);
    component.raportForm.value.date_end = {
      format: (key) => key,
    };
    component.raportForm.value.date_start = {
      format: (key) => key,
    };
    component.getRaport();
    expect(getRaportSpy).toHaveBeenCalled();
    expect(component.raport).toEqual(report);
    expect(component.raportTasks).toEqual(report.report.tasks_between);
  });

  it('#sumHours', () => {
    component.raportTasks = [
      { hours_spent: 2 },
      { hours_spent: 5 },
    ];
    const sum = component.sumHours();

    expect(sum).toEqual(7);
  });

});
