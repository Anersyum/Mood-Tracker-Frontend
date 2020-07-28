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

  isWrittingToDiary = false;
  diaryModel = {
    title: '',
    entry: '',
    userId: ''
  };
  diaryEntries: any;
  showEntryInModal = false;
  diaryEntry: any;
  isEditing = false;
  isBookOpen = false;
  page = 1;
  movingPage = false;
  error = false;

  constructor(private diaryService: DiaryService, private userService: UserService,
              private diaryNotificationService: DiaryNotificationService) { }

  ngOnInit() {

    this.diaryService.getAllUserEntries(this.page).subscribe(response => {

      this.diaryEntries = response;

      this.cancelWrittingToDiary();
      this.clearDiaryModel();

      this.isEditing = false;
      if (window.location.search.indexOf('openBook=true') !== -1) {

        this.openBook();
      }
    }, error => {

      this.error = true;
      console.error(error);
    });
  }

  nextPage() {

    if (this.diaryEntries.length === 11) {
      this.page++;
      this.ngOnInit();
    }
  }

  previousPage() {

    if (this.page > 1) {
      this.page--;
      this.ngOnInit();
    }
  }

  writeToDiary() {

    this.isWrittingToDiary = true;
  }

  cancelWrittingToDiary() {

    this.isWrittingToDiary = false;
  }

  onFormSubmit() {

    if (this.isEditing) {
      this.editDiaryEntry();
      return;
    }

    this.diaryModel.userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.saveDiaryEntry(this.diaryModel).subscribe(response => {

      this.ngOnInit();
      this.clearDiaryModel();

      this.diaryNotificationService.notify('Created entry successfully!');
    }, error => {
      console.log(error);
      this.diaryNotificationService.notify('Entry was not created.', false);
    });
  }

  editDiaryEntry() {

    this.diaryService.editDiaryEntry(this.diaryModel).subscribe(response => {

      this.ngOnInit();
      this.diaryNotificationService.notify('Entry edited successfully!');

      this.isEditing = false;
    }, error => {

      this.cancelWrittingToDiary();
      this.diaryNotificationService.notify('Entry editing failed.', false);

      console.error(error);
    });
  }

  showEntry(entryId) {

    this.diaryService.getOneDiaryEntry(entryId).subscribe(response => {

      this.diaryEntry = response;
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
      this.isWrittingToDiary = true;
      this.isEditing = true;
      this.showEntryInModal = false;
    });
  }

  deleteEntry(entryId: number) {

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.deleteDiaryEntry(userId, entryId).subscribe(response => {

      this.ngOnInit();
      this.showEntryInModal = false;
      this.diaryNotificationService.notify('Entry deleted successfully!');
    }, error => {
      this.diaryNotificationService.notify('There was a problem deleteing the diary entry.', false);
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

  openBook() {

    this.isBookOpen = true;
  }

  closeBook() {

    this.isBookOpen = false;
  }
}
