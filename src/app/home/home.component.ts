import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MoodService } from '../_services/mood.service';
import { Mood } from '../_models/Mood';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasMoodBeenSelected = false;
  moodModel: Mood = {
    moodName: ''
  };
  moodsList: Mood[];
  submitted = false;

  constructor(private router: Router, private userService: UserService, private moodService: MoodService,
              private notificationService: DiaryNotificationService) { }

  ngOnInit() {

    this.moodService.getMoodsList('all').subscribe((response: Mood[]) => {

      this.moodsList = response;
    }, error => {

      this.notificationService.notify('Problem getting the moods from the server', false);
    });
  }

  saveMood() {

    if (typeof this.moodsList === 'undefined') {
      return;
    }

    this.submitted = true;

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));
    const mood = this.moodsList.filter(x => x.moodName === this.moodModel.moodName.toLowerCase())[0];

    if (!mood) {

      this.notificationService.notify('Mood doesn\'t exist!', false);
      this.submitted = false;

      return;
    }

    const moodModel = {
      userid: userId,
      moodId: mood.id,
      token: localStorage.getItem('token')
    };

    this.moodService.saveMood(moodModel).subscribe(() => {

      this.hasMoodBeenSelected = true;
      this.submitted = false;
    }, error => {

      this.submitted = false;
      console.log(error);
      this.notificationService.notify('Something went wrong', false);
    });
  }

  goToDiarySection() {

    this.router.navigateByUrl('/diary?openBook=true');
  }
}
