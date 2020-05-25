import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-projects-index',
  templateUrl: './projects-index.component.html',
  styleUrls: ['./projects-index.component.css']
})
export class ProjectsIndexComponent implements OnInit {

  projects: Array<any>;
  pageEvent: PageEvent;
  public paginator = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5],
    pageIndex: 0,
  };

  constructor(private projectsS: ProjectsService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = 0;
    }

    this.projectsS.getAll(pageIndex + 1).subscribe((res: any) => {
      this.paginator.length = res.meta.total;
      this.projects = res.data;
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.paginator.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePage(event) {
    this.fetchData(event.pageIndex);
  }


}
