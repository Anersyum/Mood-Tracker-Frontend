import { Component, OnInit, SimpleChange } from '@angular/core';
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

  active = {};
  dropdown = false;
  source = fromEvent(document, 'click');
  subscription = null;
  showSearch = false;
  searchModel = {
    user: ''
  };
  profilePic: string = 'https://res.cloudinary.com/cook-becker/image/fetch/q_auto:best,f_auto,w_380,h_380,c_fill,g_north,e_sharpen/https://candb.com/site/candb/images/artwork/Joker_Persona-5_Atlus_1920.jpg';

  constructor(public authService: AuthService, private router: Router,
              private userService: UserService, private loaderService: LoadingService) { }

    //todo make change picture on navbar
  ngOnInit() {

    const id = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.profilePic = 'http://localhost:5200/api/users/user/' + id + '/' + this.userService.getProfileImage();
  }

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
}
