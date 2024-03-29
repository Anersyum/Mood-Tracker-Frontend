import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../_services/diary.service';
import { UserService } from '../_services/user.service';
import { DiaryNotificationService } from '../_services/diaryNotification.service';
import { DiaryEntry } from '../_models/DiaryEntry';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  isWrittingToDiary = false;
  diaryModel: DiaryEntry;
  diaryEntries: Array<DiaryEntry>;
  showEntryInModal = false;
  diaryEntry: any;
  isEditing = false;
  isBookOpen = false;
  page = 1;
  movingPage = false;
  error = false;
  titleSection = true;
  nextSection = false;
  isFiltered = false;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  month: number;
  year: number;
  firstEntryYear: number;
  yearRange: any;
  isFilterMenuOpen = false;

  constructor(private diaryService: DiaryService, private userService: UserService,
              private diaryNotificationService: DiaryNotificationService) { }

  ngOnInit() {

    this.getAllDiaryEntries();
  }

  private getAllDiaryEntries() {

    this.diaryService.getAllUserEntries(this.page).subscribe((response: Array<DiaryEntry>) => {

      this.diaryEntries = response;

      this.cancelWrittingToDiary();
      this.clearDiaryModel();

      this.isEditing = false;

      // tslint:disable-next-line: radix
      this.firstEntryYear = parseInt(this.diaryEntries[0].dateRecorded.split('/')[2]);
      this.yearRange = new Array(new Date().getFullYear() - (this.firstEntryYear - 1));

      if (window.location.search.indexOf('openBook=true') !== -1) {

        this.openBook();
      }
    }, error => {

      this.error = true;
      console.error(error);
    });
  }

  nextPage() {

    if (this.diaryEntries.length === 10) {
      this.page++;
      if (this.isFiltered) {
        this.filterByDate(this.month, this.year)
      }
      else {
        this.getAllDiaryEntries();
      }
    }
  }

  previousPage() {

    if (this.page > 1) {
      this.page--;
      if (this.isFiltered) {
        this.filterByDate(this.month, this.year)
      }
      else {
        this.getAllDiaryEntries();
      }
    }
  }

  writeToDiary() {

    this.isWrittingToDiary = true;
  }

  cancelWrittingToDiary() {

    this.isWrittingToDiary = false;
    this.titleSection = true;
    this.nextSection = false;
    this.clearDiaryModel();
  }

  onFormSubmit() {

    if (this.isEditing) {
      this.editDiaryEntry();
      return;
    }

    this.diaryModel.userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.saveDiaryEntry();
  }

  private saveDiaryEntry() {

    this.diaryService.saveDiaryEntry(this.diaryModel).subscribe(() => {

      this.getAllDiaryEntries();
      this.clearDiaryModel();

      this.diaryNotificationService.notify('Created entry successfully!');
    }, error => {
      console.log(error);
      this.diaryNotificationService.notify('Entry was not created.', false);
    });
  }

  editDiaryEntry() {

    this.diaryService.editDiaryEntry(this.diaryModel).subscribe(() => {

      this.getAllDiaryEntries();
      this.diaryNotificationService.notify('Entry edited successfully!');

      this.isEditing = false;
    }, error => {

      this.cancelWrittingToDiary();
      this.diaryNotificationService.notify('Entry editing failed.', false);

      console.error(error);
    });
  }

  showEntry(entryId) {

    this.diaryService.getOneDiaryEntry(entryId).subscribe((response: DiaryEntry) => {

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

    this.diaryService.getOneDiaryEntry(entryId).subscribe((response: DiaryEntry) => {

      this.diaryModel = response;
      this.isWrittingToDiary = true;
      this.isEditing = true;
      this.showEntryInModal = false;
    });
  }

  deleteEntry(entryId: number) {

    const userId = this.userService.getUserIdFromToken(localStorage.getItem('token'));

    this.diaryService.deleteDiaryEntry(userId, entryId).subscribe(() => {

      this.getAllDiaryEntries();
      this.showEntryInModal = false;
      this.diaryNotificationService.notify('Entry deleted successfully!');
    }, error => {
      this.diaryNotificationService.notify('There was a problem deleteing the diary entry.', false);
      console.log(error);
    });
  }

  clearDiaryModel() {

    this.diaryModel = {
      id: null,
      title: '',
      entry: '',
      userId: null,
      dateRecorded: ''
    };
  }

  openBook() {

    this.isBookOpen = true;
  }

  closeBook() {

    this.isBookOpen = false;
  }

  changeSection() {

    setTimeout(() => {
      this.titleSection = !this.titleSection;
    }, 490);
    this.nextSection = !this.nextSection;
  }

  filterByDate(month, year) {

    this.month = month;
    this.year = year;

    this.diaryService.filterDiaryEntries(month, year, this.page).subscribe((response: Array<DiaryEntry>) => {

      console.log(response);
      this.diaryEntries = response;
      this.cancelWrittingToDiary();
      this.clearDiaryModel();

      this.isEditing = false;
      this.isFiltered = true;
      this.closeFilterMenu();
    }, error => {
      console.error(error);
    });
  }

  clearFilter() {

    this.isFiltered = false;
    this.getAllDiaryEntries();
    this.closeFilterMenu();
  }

  // these two functions are for the mobile filter menu
  openFilterMenu() {

    this.isFilterMenuOpen = true;
  }

  closeFilterMenu() {

    this.isFilterMenuOpen = false;
  }
}
