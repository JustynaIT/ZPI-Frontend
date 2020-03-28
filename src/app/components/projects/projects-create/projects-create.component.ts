import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.css']
})
export class ProjectsCreateComponent implements OnInit {

  public AddProjectForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private projectS: ProjectsService,
              private snackBar: MatSnackBar) {
    this.AddProjectForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  addProject() {

    if (!this.AddProjectForm.invalid) {

      this.projectS.create(this.AddProjectForm.value).subscribe(
        res => {
          this.router.navigate(['/auth/projects']);
          this.snackBar.open('Project created', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        },
        error => {
          if (error.error.code === 422) {
            if (error.error.errors) {
              // tslint:disable-next-line: forin
              for (const e in error.error.errors) {
                this.AddProjectForm.get(e).setErrors({ server: error.error.errors[e][0] });
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
    if (this.AddProjectForm.get(key).errors.required) {
      return `Field ${key} is required`;
    }
    if (this.AddProjectForm.get(key).errors.server) {
      return this.AddProjectForm.get(key).errors.server;
    }
  }

  get name() {
    return this.AddProjectForm.get('name');
  }
  get budget() {
    return this.AddProjectForm.get('budget');
  }
}




