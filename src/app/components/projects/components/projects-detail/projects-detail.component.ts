import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {

  @Input() project;

  constructor(private authS: AuthService) { }

  ngOnInit() {
  }

}
