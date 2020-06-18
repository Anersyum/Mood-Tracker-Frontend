import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { fromEvent } from 'rxjs';

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

  constructor(public authService: AuthService, private router: Router, private userService: UserService) { }

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

  // make the code better
  dropdownMenu() {

    if (this.subscription) {

      return;
    }

    this.subscription = this.source.subscribe((event) => {

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
}
