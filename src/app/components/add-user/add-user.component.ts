import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public AddUserForm: FormGroup;
  public roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'LEADER', label: 'Leader' },
    { value: 'WORKER', label: 'Worker' },
    { value: 'CLIENT', label: 'Client' }];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.AddUserForm = this.formBuilder.group({
      email: new FormControl('', [, Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
      hr_wage: new FormControl(''),
      project_id: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      birth_date: new FormControl(''),
      role: new FormControl('', [Validators.required,]),
    });
  }

  ngOnInit() {
  }

  addUser() {

    if (!this.AddUserForm.invalid) {
      const newUser = this.AddUserForm.value;

      if (newUser.birth_date) {
        newUser.birth_date = newUser.birth_date.format('YYYY-MM-DD');
      }

      this.authService.addUser(newUser).subscribe(
        res => {
          this.AddUserForm.reset();
          this.removeValidators(this.AddUserForm);
          this.snackBar.open('User added', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        },
        error => {
          if (error.error.code === 422) {
            if (error.error.errors) {
              // tslint:disable-next-line: forin
              for (let e in error.error.errors) {
                this.AddUserForm.get(e).setErrors({ server: error.error.errors[e][0] });
              }
            }
          }
        }
      );
    }
  }


  public removeValidators(form: FormGroup) {
    // tslint:disable-next-line: forin
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  getErrorMessage(key) {
    if (this.AddUserForm.get(key).errors.required) {
      return `Field ${key} is required`;
    }
    if (this.AddUserForm.get(key).errors.email) {
      return 'Not a valid email';
    }
    if (this.AddUserForm.get(key).errors.minlength) {
      return 'The password must be at least 6 characters';
    }
    if (this.AddUserForm.get(key).errors.server) {
      return this.AddUserForm.get(key).errors.server;
    }
  }


  get email() {
    return this.AddUserForm.get('email');
  }
  get name() {
    return this.AddUserForm.get('name');
  }
  get password() {
    return this.AddUserForm.get('password');
  }
  get password_confirmation() {
    return this.AddUserForm.get('password_confirmation');
  }
  get project_id() {
    return this.AddUserForm.get('project_id');
  }
  get role() {
    return this.AddUserForm.get('role');
  }
  get phone() {
    return this.AddUserForm.get('phone');
  }
}


