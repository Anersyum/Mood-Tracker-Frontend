import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaryNotificationService {

  notificationStackHeight = -60;

  constructor() { }

  notify(text: string, success = true) {

    const notificationContainer = document.createElement('div');
    const notificationText = document.createElement('span');

    notificationContainer.classList.add('diary-notify');
    notificationText.classList.add('notify-text');

    notificationText.innerText = text;
    notificationContainer.appendChild(notificationText);

    if (success) {

      notificationContainer.style.backgroundColor = '#75b79e';
    }
    else {

      notificationContainer.style.backgroundColor = '#d8345f';
    }

    this.notificationStackHeight += 70;
    console.log(this.notificationStackHeight);
    notificationContainer.style.setProperty('--notification-height', this.notificationStackHeight + 'px');

    document.body.appendChild(notificationContainer);
    // todo: fix popup going out of bounds
    setTimeout(() => {
      document.body.removeChild(notificationContainer);

      if (!document.querySelector('.diary-notify')) {

        this.notificationStackHeight = -60;
      }
    }, 3000);
  }
}
