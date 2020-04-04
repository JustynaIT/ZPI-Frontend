import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects-show',
  templateUrl: './projects-show.component.html',
  styleUrls: ['./projects-show.component.css']
})
export class ProjectsShowComponent implements OnInit {

  public project;
  public idProject;

  constructor(private projectS: ProjectsService,
              private route: ActivatedRoute,
              private authS: AuthService) { }

  ngOnInit() {
    this.fetchProject();
  }

  private fetchProject() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    if (this.idProject === null) {
      this.projectS.getProjectCurrentUser()
        .subscribe((res) => {
          this.project = res;
          console.log(res);
        });
    } else {
      this.projectS.get(this.idProject)
        .subscribe((res: any) => {
          this.project = res;
          console.log(res);
        });
    }
  }

}
