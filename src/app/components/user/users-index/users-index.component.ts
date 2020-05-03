import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, PageEvent } from '@angular/material';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  public users;
  pageEvent: PageEvent;
  public paginator = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5],
    pageIndex: 0,
  };

  constructor(private authS: AuthService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchUser();
    
  }

  fetchUser(pageIndex?: number) {
    if (!pageIndex) {
      pageIndex = 0;
    }

    this.authS.getUserAll(pageIndex + 1).subscribe({
      next: (res: any) => {
        this.users = res.data;
        this.paginator.length = res.meta.total;
        console.log(res)
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
