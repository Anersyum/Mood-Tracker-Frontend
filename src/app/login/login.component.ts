import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'protractor';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  registeredSuccess = false;
  loginError = false;

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
        this.loginError = true;
      }
    });
  }

  isLoggedIn() {

    return this.authService.isLoggedIn();
  }
}
