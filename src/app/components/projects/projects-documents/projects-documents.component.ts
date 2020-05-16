import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-projects-documents',
  templateUrl: './projects-documents.component.html',
  styleUrls: ['./projects-documents.component.css']
})
export class ProjectsDocumentsComponent implements OnInit {

  public documentForm: FormGroup;
  public idProject;
  public file;
  public documents;
  pageEvent: PageEvent;
  public paginator = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5],
    pageIndex: 0,
  };

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private documentS: DocumentsService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.idProject = this.route.snapshot.paramMap.get('id');
    this.documentForm = this.formBuilder.group({
      description: new FormControl(''),
    });
    this.getDocuments();

  }

  public getDocuments() {
    this.documentS.get(this.idProject).subscribe({
      next: (res: any) => {
        this.paginator.length = res.meta.total;
        this.documents = res.data;
      }
    });
  }

  public addDocument() {
    const formData: FormData = new FormData();
    formData.append('document', this.file, this.file.name);
    formData.append('project_id', this.idProject);
    formData.append('description', this.documentForm.value.description);

    this.documentS.create(formData).subscribe({
      next: (res: any) => {
        this.getDocuments();
        this.snackBar.open('Add document', 'close', {
          duration: 2000,
          panelClass: ['color-snackbar']
        });
        console.log(res);
      }
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentS.delete(id).subscribe(() => {
          this.getDocuments();
          this.paginator.pageIndex = 0;
          this.snackBar.open('Document remove', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        });
      }
    });
  }

  public fileChange(e) {
    this.file = e.target.files[0];
  }

  public openDocument(link) {
    window.open(environment.storage + link);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.paginator.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
