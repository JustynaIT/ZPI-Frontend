import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  public roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'LEADER', label: 'Leader' },
    { value: 'WORKER', label: 'Worker' },
    { value: 'CLIENT', label: 'Client' }];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private validators: ValidatorsService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', [, Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
      hr_wage: new FormControl(''),
      project_id: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      birth_date: new FormControl(''),
      role: new FormControl('', [Validators.required]),
    });

    this.validators.setForm(this.userForm);
  }

  public addUser() {
    if (!this.userForm.invalid) {
      const newUser = this.userForm.value;

      if (newUser.birth_date) {
        newUser.birth_date = newUser.birth_date.format('YYYY-MM-DD');
      }

      this.authService.addUser(newUser).subscribe({
        next: (res: any) => {
          this.userForm.reset();
          this.validators.clear(this.userForm);
          this.snackBar.open(res.message, 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        },
        error: (error) => {
          this.validators.handlerError(error);
        }
      });
    }
  }

  ngOnDestroy() {
    this.validators.clearForm();
  }
}


