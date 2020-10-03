import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

    baseUrl = environment.apiUrl + 'auth/';
    jwtHelper = new JwtHelperService();

    login(model: User) {

      return this.http.post(this.baseUrl + 'login', {
        username: model.username,
        password: model.password
      }).pipe(
        map((response: any) => {
          const user = response;

          if (user) {
            localStorage.removeItem('token');
            localStorage.setItem('token', user.token);
          }

          this.userService.setProfileImage();
        }));
    }

    isLoggedIn() {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

    register(model: User) {

      return this.http.post(this.baseUrl + 'register', model);
    }
}
