import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { fromEvent } from 'rxjs';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {

  dropdown = false;
  source = fromEvent(document, 'click');
  subscription = null;
  showSearch = false;
  searchModel = {
    user: ''
  };
  isMenuOpen = false;

  constructor(public authService: AuthService, private router: Router,
              public userService: UserService, private loadingService: LoadingService) { }

  ngOnInit() {

    this.userService.setProfileImage();
  }

  logout() {

    localStorage.removeItem('token');
    this.closeMenu();
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

  stopLoading() {

    this.loadingService.stopLoad();
  }

  openMobileProfileMenu() {

    this.isMenuOpen = true;
  }

  closeMenu() {

    this.isMenuOpen = false;
  }
}
