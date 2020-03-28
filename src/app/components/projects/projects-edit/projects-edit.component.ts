import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public EditProjectForm: FormGroup;
  public idProject;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private projectS: ProjectsService,
              private snackBar: MatSnackBar) {
    this.EditProjectForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    this.projectS.get(this.idProject).subscribe((res: any) => {
      this.EditProjectForm.patchValue(res);
    });
  }

  editProject() {

    if (!this.EditProjectForm.invalid) {

      this.projectS.edit(this.idProject, this.EditProjectForm.value).subscribe(
        res => {
          this.router.navigate(['/auth/projects']);
          this.snackBar.open('Project saved', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        },
        error => {
          if (error.error.code === 422) {
            if (error.error.errors) {
              // tslint:disable-next-line: forin
              for (const e in error.error.errors) {
                this.EditProjectForm.get(e).setErrors({ server: error.error.errors[e][0] });
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
    if (this.EditProjectForm.get(key).errors.required) {
      return `Field ${key} is required`;
    }
    if (this.EditProjectForm.get(key).errors.server) {
      return this.EditProjectForm.get(key).errors.server;
    }
  }

  get name() {
    return this.EditProjectForm.get('name');
  }
  get budget() {
    return this.EditProjectForm.get('budget');
  }
}
