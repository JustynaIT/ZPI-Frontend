import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material';
import { ValidatorsService } from 'src/app/services/validators.service';
import { TasksComponent } from '../tasks/tasks/tasks.component';
import { AuthService } from 'src/app/services/auth.service';

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
              private validators: ValidatorsService,
              private authS: AuthService,
              ) {}

  ngOnInit() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    this.fetchProject(this.idProject);
  }

  private fetchProject(id) {
    if (id === null) {
      this.projectS.getProjectCurrentUser()
        .subscribe((res) => {
          this.project = res;
          this.fetchUsersProject();
          this.fetchTasks();
        });
    } else {
      this.projectS.get(id)
        .subscribe((res: any) => {
          this.project = res;
          this.fetchUsersProject();
          this.fetchTasks();
        });
    }
  }

  private fetchUsersProject() {
    this.projectS.getUsersProject(this.project.id).subscribe({
      next: (res: any) => {
        this.usersProject = res.data;
      },
    });
  }

  private fetchTasks(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = 0;
    }

    if (this.authS.role() !== 'ADMIN') {
      this.idProject = this.project.id;
    }

    if (this.idProject !== null) {
        this.tasksS.getProjectTasks(this.idProject, pageIndex + 1)
        .subscribe((res: any) => {
          this.task.setPaginator(res.meta.total);
          this.tasks = res.data.map(task => {
            return {
              isEdit: false,
              ...task,
            };
          });
        });
    } else {
      this.tasksS.getTasksCurrentUser(pageIndex + 1)
        .subscribe((res: any) => {
          this.task.setPaginator(res.meta.total);
          this.tasks = res.data;
        });
    }
  }
}
