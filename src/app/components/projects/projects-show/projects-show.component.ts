import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material';
import { ValidatorsService } from 'src/app/services/validators.service';
import { TasksComponent } from '../tasks/tasks/tasks.component';

@Component({
  selector: 'app-projects-show',
  templateUrl: './projects-show.component.html',
  styleUrls: ['./projects-show.component.css']
})
export class ProjectsShowComponent implements OnInit {

  public project;
  public tasks;
  public idProject;
  public usersProject;
  @ViewChild('task', { static: true }) task: TasksComponent;

  constructor(private projectS: ProjectsService,
              private tasksS: TasksService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private validators: ValidatorsService
              ) {}

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
          this.fetchUsersProject();
        });
    } else {
      this.projectS.get(this.idProject)
        .subscribe((res: any) => {
          this.project = res;
          this.fetchUsersProject();
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

  private fetchTasks(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = 0;
    }

    if (this.idProject === null) {
      this.tasksS.getTasksCurrentUser(pageIndex + 1)
        .subscribe((res: any) => {
          this.task.setPaginator(res.meta.total);
          this.tasks = res.data;
        });
    } else {
      this.tasksS.getProjectTasks(this.idProject, pageIndex + 1)
        .subscribe((res: any) => {
          this.tasks = res.data.map(task => {
            this.task.setPaginator(res.meta.total);
            return {
              isEdit: false,
              ...task,
            };
          });
        });
    }
  }
}
