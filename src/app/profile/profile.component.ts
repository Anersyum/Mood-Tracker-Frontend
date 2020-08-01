import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private notificationService: DiaryNotificationService,
              private router: Router) { }
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

    this.userService.editUserInfo(this.model).subscribe((response: any) => {

      this.notificationService.notify('Edited profile successfully!');
      this.router.navigateByUrl('/home');
    }, error => {

      console.error(error);

      const errorMessage = 'The profile couldn\'t be edited. Check your internet connection or contact the site administrator.'
      this.notificationService.notify(errorMessage, false);
    });
  }

}
