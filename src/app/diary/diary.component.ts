import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../_services/diary.service';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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
  isEditing = false;

  constructor(private diaryService: DiaryService, private userService: UserService,
              private notify: DiaryNotificationService, private router: Router) { }

  ngOnInit() {

    this.diaryService.getAllUserEntries().subscribe(response => {

      this.diaryEntries = response;
      this.cancelDiaryEntryCreation();
      this.clearDiaryModel();
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

    if (this.isEditing) {

      this.diaryService.editDiaryEntry(this.diaryModel).subscribe(response => {

        this.ngOnInit();
        this.notify.notify('Entry edited successfully!');
        this.isEditing = false;
      }, error => {
        this.cancelDiaryEntryCreation();
        this.notify.notify('Entry editing failed.', false);
        console.error(error);
      });

      return;
    }

    this.diaryModel.userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.saveDiaryEntry(this.diaryModel).subscribe(response => {

      this.ngOnInit();
      this.clearDiaryModel();

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

  initializeEdit(entryId: number) {

    this.diaryService.getOneDiaryEntry(entryId).subscribe((response: any) => {

      this.diaryModel = response;
      this.isCreatingNewDiaryEntry = true;
      this.isEditing = true;
    })
  }

  deleteEntry(entryId: number) {

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.deleteDiaryEntry(userId, entryId).subscribe(response => {

      this.ngOnInit();
      this.notify.notify('Entry deleted successfully!');
    }, error => {
      this.notify.notify('There was a problem deleteing the diary entry.', false);
      console.log(error);
    });
  }

  clearDiaryModel() {

    this.diaryModel = {
      title: '',
      entry: '',
      userId: ''
    };
  }
}
