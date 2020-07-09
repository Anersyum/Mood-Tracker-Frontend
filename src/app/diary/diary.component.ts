import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  isCreatingNewDiaryEntry = false;

  constructor() { }

  ngOnInit() {
  }

  createNewDiaryEntry() {

    this.isCreatingNewDiaryEntry = true;
  }

  cancelDiaryEntryCreation() {

    this.isCreatingNewDiaryEntry = false;
  }

  createDiaryEntry() {
    // create entry
  }
}
