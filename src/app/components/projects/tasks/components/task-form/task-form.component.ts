import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() projectID;
  @Input() usersProject;
  public taskForm: FormGroup;
  public prioritys = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];
  public statuses = [
    { value: 'done', label: 'Done' },
    { value: 'in_progress', label: 'In progress' },
    { value: 'not_assigned', label: 'Not assigned' },
  ];
  constructor(private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private projectS: ProjectsService) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      user_id: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      hours_spent: new FormControl(''),
      expire_date: new FormControl('', [Validators.required]),
    });

    this.validators.setForm(this.taskForm);
    this.taskForm.reset();
    this.validators.clear2();
  }

  public setDataForm(task) {
    task.user_id = task.user.id;
    this.taskForm.patchValue(task);
  }

  public getForm() {
    return this.taskForm;
  }

  public reset() {
    this.taskForm.reset();
  }

}
