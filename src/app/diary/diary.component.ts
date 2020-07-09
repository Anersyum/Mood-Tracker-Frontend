import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../_services/diary.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  isCreatingNewDiaryEntry = false;
  diaryModel = {
    title: '',
    entry: '',
    userId: ''
  };
  diaryEntries: any;

  constructor(private diaryService: DiaryService, private userService: UserService) { }

  ngOnInit() {

    this.diaryService.getAllUserEntries().subscribe(response => {

      this.diaryEntries = response;
      console.log(response);
    }, error => {

      console.error(error);
    });
  }

  createNewDiaryEntry() {

    this.isCreatingNewDiaryEntry = true;
  }

  cancelDiaryEntryCreation() {

    this.isCreatingNewDiaryEntry = false;
  }

  createDiaryEntry() {

    this.diaryModel.userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.saveDiaryEntry(this.diaryModel).subscribe(response => {

      this.cancelDiaryEntryCreation();
    }, error => {
      console.log(error);
    });
  }
}
