import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  public user;
  constructor(private authS: AuthService) { }

  ngOnInit() {
    this.authS.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data.item;
      }
    });
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
