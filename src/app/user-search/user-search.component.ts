import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UserSearchService } from '../_services/user-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, DoCheck {

  user = '';
  constructor(private userSearchService: UserSearchService, private router: Router) { }

  ngDoCheck(): void {

    if (this.userSearchService.getSearchedUsersResult().pressedEnter) {

      this.user = this.userSearchService.getSearchedUsersResult().user;
      this.userSearchService.userSearchResults.pressedEnter = false;
    }
  }

  ngOnInit() {

    if (this.userSearchService.getSearchedUsersResult().user === '') {

      this.user = this.router.parseUrl(this.router.url).queryParams.user;
    }
    else {

      this.user = this.userSearchService.getSearchedUsersResult().user;
    }
  }

}
