import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-projects-show',
  templateUrl: './projects-show.component.html',
  styleUrls: ['./projects-show.component.css']
})
export class ProjectsShowComponent implements OnInit {

  public project;
  public tasks;
  public usersProject;
  public idProject;
  public isEditEnable = false;
  public isAddEnable = false;
  public editTaskForm: FormGroup;
  public indexEditTask: number;
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

  constructor(private projectS: ProjectsService,
              private tasksS: TasksService,
              private route: ActivatedRoute,
              private authS: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.editTaskForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      user_id: new FormControl(''),
      status: new FormControl(''),
      hours_spent: new FormControl(''),
      expire_date: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.fetchProject();
    this.fetchTasks();
  }

  private fetchProject() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    if (this.idProject === null) {
      this.projectS.getProjectCurrentUser()
        .subscribe((res) => {
          this.project = res;
          console.log(res);
          this.fetchUsersProject();
        });
    } else {
      this.projectS.get(this.idProject)
        .subscribe((res: any) => {
          this.project = res;
          console.log(res);
          this.fetchUsersProject();
        });
    }
  }

  private fetchTasks() {
    if (this.idProject === null) {
      this.tasksS.getTasksCurrentUser()
        .subscribe((res) => {
          this.tasks = res;
          console.log(res);
        });
    } else {
      this.tasksS.getProjectTasks(this.idProject)
        .subscribe((res: any) => {
          this.tasks = res.map(task => {
            return {
              isEdit: false,
              ...task,
            };
          });
          console.log(res);
        });
    }
  }

  private fetchUsersProject() {
    this.projectS.getUsersProject(this.project.id).subscribe({
      next: (res) => {
        this.usersProject = res;
      },
    });
  }

  public enableEditing(id: number) {
    this.indexEditTask = this.tasks.findIndex(task => task.id === id);
    this.editTaskForm.patchValue(this.tasks[this.indexEditTask]);
    this.tasks[this.indexEditTask].isEdit = !this.tasks[this.indexEditTask].isEdit;
    this.isEditEnable = true;
  }

  public saveTask(id) {
    this.tasksS.edit(id, this.editTaskForm.value).subscribe({
      next: () => {
        this.tasks[this.indexEditTask].isEdit = false;
        this.isEditEnable = false;
        this.fetchTasks();
        this.fetchProject();        
        this.tasks[this.indexEditTask].isEdit = false;
        this.isEditEnable = false;
        this.snackBar.open('task edited', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
      },
      error: (error) => {
        if (error.error.code === 422) {
          if (error.error.errors) {
            // tslint:disable-next-line: forin
            for (let e in error.error.errors) {
              this.editTaskForm.get(e).setErrors({ server: error.error.errors[e][0] });
            }
          }
        }
      },
    });
  }

  public cancelEditTask() {
    this.tasks[this.indexEditTask].isEdit = false;
    this.isEditEnable = false;
  }

  public deleteTask() {

  }

  public enableAdd() {
    this.editTaskForm.reset();
    this.removeValidators(this.editTaskForm);
    this.isAddEnable = true;
  }

  public addTask() {
    this.tasksS.create({project_id: this.idProject, ...this.editTaskForm.value}).subscribe({
      next: () => {
        this.fetchTasks();
        this.fetchProject();
        this.editTaskForm.reset();
        this.removeValidators(this.editTaskForm);
        this.isAddEnable = false;
        this.snackBar.open('task added', 'close', {
          duration: 2000,
          panelClass: ['color-snackbar']
        });
      },
      error: (error) => {
        if (error.error.code === 422) {
          if (error.error.errors) {
            // tslint:disable-next-line: forin
            for (let e in error.error.errors) {
              this.editTaskForm.get(e).setErrors({ server: error.error.errors[e][0] });
            }
          }
        }
      }
    });
    
  }

  public cancelAddTask() {
    this.isAddEnable = false;
  }

  public setIcon(status): string {
    if (status === 'in_progress') {
      return 'update';
    } else if (status === 'done' ) {
      return 'done';
    } else {
      return 'report';
    }
  }

  public setColor(priority, status): string  {
    if (status === 'done') {
      return '#4aff29';
    } else if (priority === 'urgent') {
      return '#ff2929';
    } else if (priority === 'high' ) {
      return '#ff6429';
    } else if (priority === 'medium' ) {
      return '#ffb329';
    } else {
      return '#f3cd74';
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
    if (this.editTaskForm.get(key).errors.required) {
      return `Field ${key} is required`;
    }
    if (this.editTaskForm.get(key).errors.server) {
      return this.editTaskForm.get(key).errors.server;
    }
  }


  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksS.delete(id).subscribe(() => {
          this.fetchTasks();
          this.fetchProject();
          this.snackBar.open('Task remove', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        });
      }
    });
  }
}
