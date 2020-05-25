import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, PageEvent, MatSnackBar } from '@angular/material';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  @ViewChild(UserFormComponent, {static: false}) userForm: UserFormComponent;

  public users;
  pageEvent: PageEvent;
  public paginator = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5],
    pageIndex: 0,
  };
  public isEditEnable = false;
  public indexEditUser: number;

  constructor(private authS: AuthService,
              private snackBar: MatSnackBar,
              private matIconRegistry: MatIconRegistry,
              private validators: ValidatorsService,
              private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchUser();
  }

  public enableEditing(id: number) {
    this.isEditEnable = true;
    this.indexEditUser = this.users.findIndex(user => user.id === id);
    this.users[this.indexEditUser].isEdit = !this.users[this.indexEditUser].isEdit;
    setTimeout(() => {
      this.userForm.setDataForm(this.users[this.indexEditUser]);
    });
  }

  public cancelEdit() {
    this.users[this.indexEditUser].isEdit = false;
    this.isEditEnable = false;
  }
  public saveUser(id) {
    const userForm = this.userForm.getForm();

    this.authS.updateUser(id, userForm.value).subscribe({
      next: (res: any) => {
        this.users[this.indexEditUser].isEdit = false;
        this.isEditEnable = false;
        this.fetchUser();
        this.users[this.indexEditUser].isEdit = false;
        this.isEditEnable = false;
        this.snackBar.open(res.message, 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
      },
      error: (error) => {
        this.validators.handlerError(error);
      }
    });
  }

  fetchUser(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = 0;
    }

    this.authS.getUserAll(pageIndex + 1).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.paginator.length = res.meta.total;
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.paginator.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePage(event) {
    this.fetchUser(event.pageIndex);
  }

  public setIcon(status): string {
    if (status === 'LEADER') {
      return 'leader';
    } else if (status === 'ADMIN' ) {
      return 'admin';
    } else if (status === 'CLIENT' ) {
      return 'client';
    } else {
      return 'user';
    }
  }

}
