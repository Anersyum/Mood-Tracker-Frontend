import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {

  userSearchResults = {
    user: '',
    pressedEnter: false
  };

  constructor() { }

  setSearchedUsers(userSearchResults) {

    this.userSearchResults = userSearchResults;
  }

  getSearchedUsersResult() {

    return this.userSearchResults;
  }
}
