import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:5200/api/users/';

  constructor(private http: HttpClient) { }

  jwtHelper = new JwtHelperService();

  getUsernameFromToken(token): string {

    return this.jwtHelper.decodeToken(token).unique_name;
  }

  getUserIdFromToken(token): number {

    return this.jwtHelper.decodeToken(token).nameid;
  }

  getLoggedInUserInfo(): Observable<User> {

    return this.http.get<User>(this.baseUrl + 'get/user/' + this.getUserIdFromToken(localStorage.getItem('token')), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  editUserInfo(userModel: any) {

    return this.http.post(this.baseUrl + 'edit/user', userModel, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      map((response: any) => {

        const user = response;

        if (user) {

          localStorage.removeItem('token');
          localStorage.setItem('token', user.token);
        }
      })
    );
  }
}
