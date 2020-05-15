import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      MatSnackBarModule,
    ],
  }));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });
});
