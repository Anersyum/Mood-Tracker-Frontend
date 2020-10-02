import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../_services/loading.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: User = {
    username: '',
    password: '',
    rePassword: '',
    email: ''
  };
  error: any = null;
  passwordsMatch = true;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  ngOnInit() {}

  register() {

    if (this.model.password !== this.model.rePassword) {
      this.passwordsMatch = false;
      return;
    }

    this.loadingService.startLoad();
    this.passwordsMatch = true;

    this.authService.register(this.model).subscribe(() => {

      this.loadingService.stopLoad();
      this.router.navigateByUrl('/login?registerSuccess=true');
    }, error => {

      this.error = 'Something went wrong';

      switch (error) {
        case 801:
          this.error = 'The usrename or email is taken';
          break;
        case 802:
          this.error = 'Passwords don\'t match';
          break;
        case 803:
          this.error = 'Wrong email format';
          break;
      }
      
      this.loadingService.stopLoad();
    });
  }


}
