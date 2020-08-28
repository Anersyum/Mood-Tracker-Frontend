import { Component, OnInit, SecurityContext } from '@angular/core';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    profileImage: File = null,
    firstName: null,
    email: null,
    lastName: null,
    profileImagePath: ''
  };
  profileImagePath: SafeUrl;
  constructor(private userService: UserService, private notificationService: DiaryNotificationService,
              private router: Router, private sanitizer: DomSanitizer) { }
  // todo: adjust date for localization
  ngOnInit() {

    this.userService.getLoggedInUserInfo().subscribe((response: any) => {

      this.model = response;

      const date = this.model.dateOfBirth.split('/');
      const day = date[0];
      const month = date[1];
      const year = date[2];

      this.model.dateOfBirth = year + '-' + month + '-' + day;
      this.profileImagePath = this.sanitizer.bypassSecurityTrustUrl(this.userService.userProfileImage);
    }, error => {

      alert('There has been an error.');
      console.error(error);
    });
  }

  onSubmit(form: HTMLFormElement) {

    this.userService.editUserInfo(form).subscribe((response: any) => {

      this.notificationService.notify('Edited profile successfully!');
      this.userService.setProfileImage();
      this.router.navigateByUrl('/home');
    }, error => {

      console.error(error);

      const errorMessage = 'The profile couldn\'t be edited. Check your internet connection or contact the site administrator.'
      this.notificationService.notify(errorMessage, false);
    });
  }

  approveForm(form: NgForm, me) {

    if (!this.userService.isValidImage(me.target.files[0])) {

      this.notificationService.notify('That format isn\'t supported', false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.profileImagePath = e.target.result;
      form.control.markAsDirty();
    }

    reader.readAsDataURL(me.target.files[0]);
  }
}
