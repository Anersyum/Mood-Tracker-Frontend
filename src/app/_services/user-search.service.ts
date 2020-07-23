import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyAaaaRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {

  usersSearchResults = {
    users: {},
    pressedEnter: false
  };
  username = '';
  baseUrl = 'http://localhost:5200/api/users/get/';

  constructor(private http: HttpClient) { }

  setUsername(username: string) {

    this.username = username;
  }

  setUsersResult(users: any) {

    this.usersSearchResults.users = users;
  }

  getSearchedUsers() {

    return this.usersSearchResults.users;
  }

  searchUsers() {

    return this.http.get(this.baseUrl + this.username, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  hasSearchStarted() {

    return this.usersSearchResults.pressedEnter;
  }

  startSearch() {

    this.usersSearchResults.pressedEnter = true;
  }

  stopSearch() {

    this.usersSearchResults.pressedEnter = false;
  }
}
