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
  moodModel = {
    moodName: ''
  };
  moodsList = [];

  constructor(private router: Router, private userService: UserService, private moodService: MoodService) { }

  ngOnInit() {

    this.moodService.getMoodsList('empty').subscribe((response: any) => {

      this.moodsList = response;
    });
  }

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
    }, error => {

      console.log(error);
    });
  }

  goToDiarySection() {

    this.router.navigateByUrl('/diary?openBook=true');
  }

  onSubmit() {

    alert(this.moodModel.moodName);
  }
}
