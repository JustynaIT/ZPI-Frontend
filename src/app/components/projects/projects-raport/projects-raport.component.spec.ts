import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRaportComponent } from './projects-raport.component';

describe('ProjectsRaportComponent', () => {
  let component: ProjectsRaportComponent;
  let fixture: ComponentFixture<ProjectsRaportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsRaportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsRaportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
