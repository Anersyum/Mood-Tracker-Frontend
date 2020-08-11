import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MoodService } from '../_services/mood.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasMoodBeenSelected = false;
  mood = '';
  moodsList = [];

  constructor(private router: Router, private userService: UserService, private moodService: MoodService) { }

  ngOnInit() {}

  saveMood(moodValue: any) {

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    const moodModel = {
      userid: userId,
      moodvalue: moodValue,
      token: localStorage.getItem('token')
    };

    this.moodService.saveMood(moodModel).subscribe(next => {

      console.log('do something after success. Remove the buttons perhaps? Secure the backend as well');
      this.hasMoodBeenSelected = true;

      switch (moodValue) {
        case '0':
          this.mood = 'depressed';
          break;
        case '1':
          this.mood = 'content';
          break;
        case '2':
          this.mood = 'happy';
          break;
      }
    }, error => {

      console.log(error);
    });
  }

  goToDiarySection() {

    this.router.navigateByUrl('/diary?openBook=true');
  }

  getWords(event) {

    const moodName = event.target.value;

    if (moodName === '') {

      return;
    }

    this.moodService.getMoodsList(moodName).subscribe((response: any) => {

      console.log(response);
      this.moodsList = response;
    })
  }
}
