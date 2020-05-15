import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailComponent } from './projects-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';

describe('ProjectsDetailComponent', () => {
  let component: ProjectsDetailComponent;
  let fixture: ComponentFixture<ProjectsDetailComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      providers: [ AuthService],
      declarations: [ ProjectsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
