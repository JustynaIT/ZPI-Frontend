import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent {

  public yes = true;
  
  constructor(
    public dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onClick(): void {
    this.data.answer = 'yes';
    this.dialogRef.close();
  }


}
