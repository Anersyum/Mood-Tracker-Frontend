import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UserSearchService } from '../_services/user-search.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, DoCheck {

  users: any;
  showProfileInfo = false;
  openedUser: any;

  constructor(private userSearchService: UserSearchService, private router: Router, private http: HttpClient) { }

  ngDoCheck(): void {

    if (this.userSearchService.hasSearchStarted()) {

      this.users = this.userSearchService.getSearchedUsers();
      this.userSearchService.stopSearch();
    }
  }

  ngOnInit() {

    if (!this.userSearchService.hasSearchStarted()) {

      const username = this.router.parseUrl(this.router.url).queryParams.user;

      this.userSearchService.setUsername(username);
      this.userSearchService.searchUsers().subscribe((response: any) => {

        console.log(response);
        this.userSearchService.setUsersResult(response);
        this.userSearchService.startSearch();
        this.users = this.userSearchService.getSearchedUsers();
      }, error => {

        console.error(error);
      });
    }
  }

  getProfileInfo(id: number) {

    this.http.get('http://localhost:5200/api/users/get/user/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).subscribe((response: any) => {

      console.log(response);
      this.openedUser = response;
      this.showProfileInfo = true;
    }, error => {

      console.error(error);
    });
  }

  addFriend(friendId: number) {

    if (confirm('Want to add ' + friendId + ' to your friends list?')) {

      alert('Added');
    }
    else {

      alert('Canceled');
    }
  }

  openDMBox() {

    alert('Create a DM box');
  }

}
