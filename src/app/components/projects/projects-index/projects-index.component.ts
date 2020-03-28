import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-projects-index',
  templateUrl: './projects-index.component.html',
  styleUrls: ['./projects-index.component.css']
})
export class ProjectsIndexComponent implements OnInit {

  projects: Array<any>;

  constructor(private projectsS: ProjectsService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.projectsS.getAll().subscribe((res: any) => {
      this.projects = res;
      this.projects.push(...res);
      console.log(res);
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsS.delete(id).subscribe(() => {
          this.fetchData();
          this.snackBar.open('Project remove', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        });
      }
    });
  }


}
