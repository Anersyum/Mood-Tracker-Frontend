import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MoodService } from '../_services/mood.service';
import { Mood } from '../_models/Mood';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasMoodBeenSelected = false;
  moodModel: Mood;
  moodsList: Mood[];
  submitted = false;

  constructor(private router: Router, private userService: UserService, private moodService: MoodService) { }

  ngOnInit() {

    this.moodService.getMoodsList('all').subscribe((response: Mood[]) => {

      this.moodsList = response;
    });
  }

  saveMood() {

    this.submitted = true;

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));
    const mood = this.moodsList.filter(x => x.moodName === this.moodModel.moodName.toLowerCase())[0];

    if (!mood) {

      console.log('Mood doesn\'t exist!');
      return;
    }

    const moodModel = {
      userid: userId,
      moodId: mood.id,
      token: localStorage.getItem('token')
    };

    this.moodService.saveMood(moodModel).subscribe(next => {

      this.hasMoodBeenSelected = true;
      this.submitted = false;
    }, error => {

      this.submitted = false;
      console.log(error);
    });
  }

  goToDiarySection() {

    this.router.navigateByUrl('/diary?openBook=true');
  }
}
