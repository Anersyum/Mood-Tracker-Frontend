import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UserSearchService } from '../_services/user-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, DoCheck {

  users: any;
  constructor(private userSearchService: UserSearchService, private router: Router) { }

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

}
