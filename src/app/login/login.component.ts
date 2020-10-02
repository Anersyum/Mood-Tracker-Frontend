import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../_services/loading.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: User = {
    username: '',
    password: '',
    rePassword: '',
    email: '',
  };
  registeredSuccess = false;
  loginError = false;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {

    this.registeredSuccess = window.location.href.indexOf('registerSuccess=true') > 0 ? true : false;
  }

  login() {

    if (this.model.username === '' || this.model.password === '') {

      return;
    }

    this.loadingService.startLoad();

    this.authService.login(this.model).subscribe(next => {

      this.loadingService.stopLoad();
      this.router.navigateByUrl('/home');
    }, error => {
      this.loadingService.stopLoad();
      if (error === 401) {
        this.errorMessage = 'Username or password is wrong!';
      }
      else {
        this.errorMessage = 'Something went wrong.';
      }
      this.loginError = true;
    });
  }

  isLoggedIn() {

    return this.authService.isLoggedIn();
  }
}
