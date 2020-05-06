import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() userID;
  public projects;
  public userForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private projectsS: ProjectsService,
              private validators: ValidatorsService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      project_id: new FormControl('', [Validators.required]),
      hr_wage: new FormControl('', [Validators.required]),
    });

    this.fetchProjects();
    this.validators.setForm(this.userForm);
    this.userForm.reset();
    this.validators.clear2();
  }

  public fetchProjects() {
    this.projectsS.getAll().subscribe({
      next: (res: any) => {
        this.projects = res.data;
      }
    });

  }

  public setDataForm(user) {
    user.project_id = user.project.id;
    this.userForm.patchValue(user);
  }

  public getForm() {
    return this.userForm;
  }

  public reset() {
    this.userForm.reset();
  }

}
