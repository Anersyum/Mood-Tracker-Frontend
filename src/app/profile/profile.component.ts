import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ok } from 'assert';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model = {
    username: null,
    profileImage: File = null,
    email: null,
    profileImagePath: ''
  };
  profileImagePath: SafeUrl;
  constructor(private userService: UserService, private notificationService: DiaryNotificationService,
              private router: Router, private sanitizer: DomSanitizer, private loadingService: LoadingService) { }

  ngOnInit() {

    this.userService.getLoggedInUserInfo().subscribe((response: any) => {

      this.model = response;
      this.profileImagePath = this.sanitizer.bypassSecurityTrustUrl(this.userService.userProfileImage);
    }, error => {

      alert('There has been an error.');
      console.error(error);
    });
  }

  onSubmit(form: HTMLFormElement) {

    this.loadingService.startLoad();

    this.userService.editUserInfo(form).subscribe((response: any) => {

      this.notificationService.notify('Edited profile successfully!');
      this.userService.setProfileImage();
      this.router.navigateByUrl('/mood');
      this.loadingService.stopLoad();
    }, error => {

      console.error(error);

      const errorMessage = 'The profile couldn\'t be edited. Check your internet connection or contact the site administrator.'
      this.notificationService.notify(errorMessage, false);
      this.loadingService.stopLoad();
    });
  }

  approveForm(form: NgForm, me, fileName: HTMLLabelElement) {

    const fileSize = me.target.files[0].size / (1024 * 1024);

    if (!this.userService.isValidImage(me.target.files[0])) {

      this.notificationService.notify('That format isn\'t supported', false);
      return;
    }

    if (fileSize > 2.0) {

      this.notificationService.notify('Image too large. 2MB is max file size', false);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.profileImagePath = e.target.result;
      fileName.innerText = me.target.files[0].name;
      form.control.markAsDirty();
    }

    reader.readAsDataURL(me.target.files[0]);
  }

  deleteAccount() {

    const deleteAccount = confirm('Do you really want to delete your account?');

    if (deleteAccount) {
      this.userService.deleteUser().subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }, error => {

        this.notificationService.notify('Something went wrong', false);
        console.error(error);
      });
    }
  }
}
