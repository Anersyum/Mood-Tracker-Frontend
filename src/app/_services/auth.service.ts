import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5200/api/auth/';
  jwtHelper = new JwtHelperService();

  login(model: any) {

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
      }));
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(model: any) {

    return this.http.post(this.baseUrl + 'register', model);
  }
}
