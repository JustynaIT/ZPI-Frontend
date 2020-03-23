import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthGuard, AuthService, {
        provide: Router, useValue: router
      }],
    });
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    authGuard = TestBed.get(AuthGuard);
  });

  it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));


  it('should return true for a logged in user', () => {
    authService.isAuthenticated = () => true;
    expect(authGuard.canActivate()).toEqual(true);
  });

  it('should navigate to login for a logged out user', () => {
    authService.isAuthenticated = () => false;
    expect(authGuard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
