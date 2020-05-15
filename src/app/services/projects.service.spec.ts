import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';

describe('ProjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      MatSnackBarModule,
    ],
  }));

  it('should be created', () => {
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });
});
