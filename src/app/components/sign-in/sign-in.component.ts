import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public LoginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {

    this.LoginForm = this.formBuilder.group({
      email: new FormControl('', [, Validators.required, Validators.email]),
      password:  new FormControl('', [ Validators.required])
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.navigate(['/auth/profile']);
    }
  }

  signIn() {
    if (!this.LoginForm.invalid) {
      this.authService.signIn(this.LoginForm.value).subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);

        this.authService.getUser().subscribe((resUser: any) => {
          localStorage.setItem('roles', resUser.data.item.roles[0].name);
          localStorage.setItem('userId', resUser.data.item.id);
          this.navigate(['/auth/profile']);
        });
      });
    }
  }

  navigate(path: Array<string>) {
    this.router.navigate(path);
  }

}
