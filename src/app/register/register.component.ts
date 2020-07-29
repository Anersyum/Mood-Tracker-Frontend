import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  error: any = null;
  passwordsMatch = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  register() {

    if (this.model.password !== this.model.rePassword) {
      this.passwordsMatch = false;
      return;
    }

    this.passwordsMatch = true;

    this.authService.register(this.model).subscribe(() => {

      this.router.navigateByUrl('/login?registerSuccess=true');
    }, error => {

      this.error = error;
    });
  }


}
