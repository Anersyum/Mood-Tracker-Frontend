import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'users/';
  userProfileImage: string;
  approvedImageTypes = ['jpg', 'jpeg', 'png'];

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

  setProfileImage(): void {

    const id = this.getUserIdFromToken(localStorage.getItem('token'));
    const imageName = this.jwtHelper.decodeToken(localStorage.getItem('token')).profile_pic;

    this.userProfileImage = this.baseUrl + 'user/' + id + '/' + imageName;
  }

  editUserInfo(form: HTMLFormElement) {

    const formData = new FormData(form);
    formData.append('id', this.getUserIdFromToken(localStorage.getItem('token')).toString());

    return this.http.post(this.baseUrl + 'edit/user', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
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

  isValidImage(file: File): boolean {

    const type = file.type.split('/')[1];

    return this.approvedImageTypes.includes(type.toLowerCase());
  }

  deleteUser() {

    const userId = this.getUserIdFromToken(localStorage.getItem('token'));

    return this.http.post(this.baseUrl + 'delete/user/', {userId}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
