import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsIndexComponent } from './projects-index.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatDialogModule, MatDialog } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { of } from 'rxjs';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';

describe('ProjectsIndexComponent', () => {
  let component: ProjectsIndexComponent;
  let fixture: ComponentFixture<ProjectsIndexComponent>;
  let projectsS;
  let dialog;

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
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [ ProjectsService],
      declarations: [ ProjectsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsIndexComponent);
    component = fixture.componentInstance;
    projectsS = TestBed.get(ProjectsService);
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    const fetchDataSpy = spyOn(component, 'fetchData').and
      .callFake(() => undefined);

    component.ngOnInit();
    expect(fetchDataSpy).toHaveBeenCalled();
  });

  it('#fetchData', () => {
    const projects = [{
        name: 'name',
      }
    ];
    const getAllSpy = spyOn(projectsS, 'getAll').and
      .callFake(() => of(projects));

    component.fetchData();
    expect(getAllSpy).toHaveBeenCalled();
    expect(component.projects = projects);
  });

  it('#openDialog', () => {
    const openSpy = spyOn(dialog, 'open').and
      .callFake(() => {
        return { afterClosed: () => of({}), close: null };
      });

    component.openDialog(1);
    expect(openSpy).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalledWith(RemoveDialogComponent, {
      width: '250px',
    });
  });

});
