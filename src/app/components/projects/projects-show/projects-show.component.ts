import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
              private formBuilder: FormBuilder) {
    this.editTaskForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      user_id: new FormControl(''),
      status: new FormControl(''),
      hours_spent: new FormControl(''),
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
      },
    });
    this.tasks[this.indexEditTask].isEdit = false;
    this.isEditEnable = false;
  }

  public cancelEditTask() {
    this.tasks[this.indexEditTask].isEdit = false;
    this.isEditEnable = false;
  }

  public deleteTask() {

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
}
