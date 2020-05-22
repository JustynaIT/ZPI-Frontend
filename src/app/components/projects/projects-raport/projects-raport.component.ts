import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects-raport',
  templateUrl: './projects-raport.component.html',
  styleUrls: ['./projects-raport.component.css']
})
export class ProjectsRaportComponent implements OnInit {

  public idProject;
  public project;
  public raportForm: FormGroup;
  public raport;
  public raportTasks;
  public displayedColumns: string[] = ['id', 'name', 'hours_spent', 'task_cost'];

  constructor(private projectS: ProjectsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.raportForm = this.formBuilder.group({
      date_start: new FormControl('', [Validators.required]),
      date_end: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.fetchProject();
  }

  private fetchProject() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    this.projectS.get(this.idProject)
      .subscribe((res) => {
        this.project = res;
      });
  }

  public getRaport() {
    const startDate = this.raportForm.value.date_start.format('YYYY-MM-DD');
    const endDate = this.raportForm.value.date_end.format('YYYY-MM-DD');
    this.projectS.getRaport(this.idProject, startDate, endDate).subscribe({
      next: (res) => {
        this.raport = res;
        this.raportTasks = res.report.tasks_between;
      },
      error: (error) => {
        if (error.error.code === 422) {
          if (error.error.errors) {
            // tslint:disable-next-line: forin
            for (const e in error.error.errors) {
              this.raportForm.get(e).setErrors({ server: error.error.errors[e][0] });
            }
          }
        }
      }
    });
  }

  getErrorMessage(key) {
    if (this.raportForm.get(key).errors.required) {
      return `Field ${key} is required`;
    }
    if (this.raportForm.get(key).errors.server) {
      return this.raportForm.get(key).errors.server;
    }
  }

  public sumHours() {
    let sum = 0;
    this.raportTasks.forEach(task => {
      sum += task.hours_spent;
    });
    return sum;
  }

}
