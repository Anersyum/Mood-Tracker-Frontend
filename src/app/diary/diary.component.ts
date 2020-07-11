import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../_services/diary.service';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';

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
  showEntryInModal = false;
  entry: any;

  constructor(private diaryService: DiaryService, private userService: UserService,
    private notify: DiaryNotificationService) { }

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

      this.diaryEntries.push(response);
      this.cancelDiaryEntryCreation();
      this.notify.notify('Created entry successfully!');
    }, error => {
      console.log(error);
      this.notify.notify('Entry was not created.', false);
    });
  }
// todo: style the modal window. Add close window support and format date on the api
  showEntry(entryId) {

    this.diaryService.getOneDiaryEntry(entryId).subscribe(response => {

      this.entry = response;
      this.showEntryInModal = true;
    }, error => {
      console.error(error);
    });
  }

  closeOpenedEntry() {

    this.showEntryInModal = false;
  }

  createNotification() {

    this.notify.notify('Hello');
  }
}
