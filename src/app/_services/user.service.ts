import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

  jwtHelper = new JwtHelperService();

  getUsernameFromToken(token) {

    return this.jwtHelper.decodeToken(token).unique_name;
  }

  getUserIdFromToken(token) {

    return this.jwtHelper.decodeToken(token).nameid;
  }
}
