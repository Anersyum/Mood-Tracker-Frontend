import { Component, OnInit, SimpleChange } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { fromEvent } from 'rxjs';
import { UserSearchService } from '../_services/user-search.service';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {

  active = {};
  dropdown = false;
  source = fromEvent(document, 'click');
  subscription = null;
  showSearch = false;
  searchModel = {
    user: ''
  };

  constructor(public authService: AuthService, private router: Router,
              private userService: UserService, private userSearchService: UserSearchService,
              private loaderService: LoadingService) { }

  ngOnInit() {}

  logout() {

    localStorage.removeItem('token');

    this.dropdown = false;
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  getLoggedInUsername() {

    const token = localStorage.getItem('token');
    const username = this.userService.getUsernameFromToken(token);

    return username;
  }

  dropdownMenu() {

    if (this.subscription) {

      return;
    }

    this.subscription = this.source.subscribe((event: any) => {

      console.log(event);
      if (event.target.classList.contains('profile-image') || event.target.classList.contains('dropdown')) {
        this.dropdown = true;
      }
      else {
        this.dropdown = false;
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    });
  }

  toggleSearchBar() {

    this.showSearch = !this.showSearch;
  }

  onEnterBtnSearch() {

    this.loaderService.startLoad();

    this.userSearchService.setUsername(this.searchModel.user);
    this.userSearchService.searchUsers().subscribe((response: any) => {

      this.userSearchService.setUsersResult(response);
      this.userSearchService.startSearch();
      this.router.navigateByUrl('/search?user=' + this.searchModel.user);
      this.loaderService.stopLoad();
    }, error => {
      this.loaderService.stopLoad();
      console.error(error);
    });
  }
}
