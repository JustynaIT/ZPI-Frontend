import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksIndexComponent } from './tasks-index.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TasksIndexComponent', () => {
  let component: TasksIndexComponent;
  let fixture: ComponentFixture<TasksIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksIndexComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
