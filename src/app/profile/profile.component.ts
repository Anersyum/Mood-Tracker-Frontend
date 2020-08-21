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
  profileImagePath: SafeUrl = 'https://res.cloudinary.com/cook-becker/image/fetch/q_auto:best,f_auto,w_380,h_380,c_fill,g_north,e_sharpen/https://candb.com/site/candb/images/artwork/Joker_Persona-5_Atlus_1920.jpg';
  constructor(private userService: UserService, private notificationService: DiaryNotificationService,
              private router: Router, private sanitizer: DomSanitizer) { }
  // todo: adjust date for localization
  ngOnInit() {

    this.userService.getLoggedInUserInfo().subscribe((response: any) => {

      console.log(response);
      this.model = response;

      const date = this.model.dateOfBirth.split('/');
      const day = date[0];
      const month = date[1];
      const year = date[2];

      this.model.dateOfBirth = year + '-' + month + '-' + day;
      if (this.model.profileImagePath !== '') {

        this.profileImagePath = this.sanitizer.bypassSecurityTrustUrl('http://localhost:5200/api/users/user/' 
          + this.userService.getUserIdFromToken(localStorage.getItem('token')) 
          + '/' 
          + this.model.profileImagePath);
      }
    }, error => {

      alert('There has been an error.');
      console.error(error);
    });
  }

  onSubmit(image: HTMLFormElement) {

    console.log(image);
    // this.model.profileImage = image.files[0];

    this.userService.editUserInfo(image).subscribe((response: any) => {

      this.notificationService.notify('Edited profile successfully!');
      this.router.navigateByUrl('/home');
    }, error => {

      console.error(error);

      const errorMessage = 'The profile couldn\'t be edited. Check your internet connection or contact the site administrator.'
      this.notificationService.notify(errorMessage, false);
    });
  }

  handleFileUpload(files: FileList, form: NgForm) {

    this.model.profileImage = files.item(0);
    form.control.markAsDirty();
  }
}
