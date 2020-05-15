import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      MatSnackBarModule,
    ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
