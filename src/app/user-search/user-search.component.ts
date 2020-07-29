import { Component, OnInit, DoCheck } from '@angular/core';
import { UserSearchService } from '../_services/user-search.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../_services/loading.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, DoCheck {

  users: any;
  showProfileInfo = false;
  openedUser: any;
  isLoading = false;
  loggedInUsername = '';

  constructor(private userSearchService: UserSearchService, private router: Router, private http: HttpClient,
              private loaderService: LoadingService, private userService: UserService) { }

  //todo: check how many times doCheck is called and try to fix too many calls to speed up the app
  ngDoCheck(): void {

    if (this.userSearchService.hasSearchStarted()) {
      // we set the search parameters in the nav component
      this.users = this.userSearchService.getSearchedUsers();
      this.userSearchService.stopSearch();
      this.loaderService.stopLoad();
    }
  }

  ngOnInit() {

    this.loggedInUsername = this.userService.getUsernameFromToken(localStorage.getItem('token'));

    this.loaderService.startLoad();

    if (!this.userSearchService.hasSearchStarted()) {

      const username = this.router.parseUrl(this.router.url).queryParams.user;

      this.userSearchService.setUsername(username);
      this.userSearchService.searchUsers().subscribe((response: any) => {

        this.userSearchService.setUsersResult(response);
        this.userSearchService.startSearch();
        this.users = this.userSearchService.getSearchedUsers();
        this.loaderService.stopLoad();
      }, error => {
        this.loaderService.stopLoad();
        console.error(error);
      });
    }
  }

  getProfileInfo(id: number) {

    this.startLoading();
    this.http.get('http://localhost:5200/api/users/get/user/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).subscribe((response: any) => {

      this.openedUser = response;
      this.stopLoading();
      this.showProfileInformation();
    }, error => {

      this.stopLoading();
      console.error(error);
    });
  }

  //todo: implement this feature
  addFriend() {

    if (confirm('Want to add ' + this.openedUser.username + ' to your friends list?')) {

      alert('Added user with the id of ' + this.openedUser.id);
    }
    else {

      alert('Canceled');
    }
  }

  //todo: implement DM feature
  openDMBox() {

    alert('Create a DM box');
  }

  private startLoading() {

    this.isLoading = true;
  }

  private stopLoading() {

    this.isLoading = false;
  }

  private showProfileInformation() {

    this.showProfileInfo = true;
  }
}
