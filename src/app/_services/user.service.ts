import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  jwtHelper = new JwtHelperService();

  getUsernameFromToken(token) {

    return this.jwtHelper.decodeToken(token).unique_name;
  }

  getUserIdFromToken(token) {

    return this.jwtHelper.decodeToken(token).nameid;
  }

  getLoggedInUserInfo() {

    return this.http.get('http://localhost:5200/api/users/get/user/' + this.getUserIdFromToken(localStorage.getItem('token')), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
