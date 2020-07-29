import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model = {
    username: null,
    bio: null,
    dateOfBirth: null,
    profileImage: null,
    firstName: null,
    email: null,
    lastName: null
  };

  constructor(private userService: UserService) { }
  // todo: adjust date for localization
  ngOnInit() {

    this.userService.getLoggedInUserInfo().subscribe((response: any) => {
      this.model = response;

      const date = this.model.dateOfBirth.split('/');
      const day = date[0];
      const month = date[1];
      const year = date[2];

      this.model.dateOfBirth = year + '-' + month + '-' + day;
    }, error => {

      alert('There has been an error.');
      console.error(error);
    });
  }

  onSubmit() {

    console.log(this.model);
  }

}
