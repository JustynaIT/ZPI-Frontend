import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-user-edit',
  templateUrl: './profile-user-edit.component.html',
  styleUrls: ['./profile-user-edit.component.css']
})
export class ProfileUserEditComponent implements OnInit, OnDestroy {

  public user;
  public userForm: FormGroup;
  public idProject;
  constructor(private authS: AuthService,
              private validators: ValidatorsService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      birth_date: new FormControl(''),
    });

    this.validators.setForm(this.userForm);
    this.idProject = this.route.snapshot.paramMap.get('id');

    this.authS.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data.item;
        this.userForm.controls.name.setValue(this.user.name);
        this.userForm.controls.birth_date.setValue(this.user.profile.birth_date);
        this.userForm.controls.phone.setValue(this.user.profile.phone);
        console.log(this.user);
      }
    });
  }

  public editUser() {
    const newUser = this.userForm.value;

    if (newUser.birth_date) {
      newUser.birth_date = moment(newUser.birth_date).format('YYYY-MM-DD');
    }

    this.authS.updateProfile(this.idProject, newUser)
      .subscribe({
        next: (res: any) => {
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

  public setIcon(status): string {
    if (status === 'LEADER') {
      return 'leader';
    } else if (status === 'ADMIN' ) {
      return 'admin';
    } else if (status === 'CLIENT' ) {
      return 'client';
    } else {
      return 'user';
    }
  }

  ngOnDestroy() {
    this.validators.clearForm();
  }
}
