import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaryNotificationService {

  notificationStackHeight = -70;

  constructor() { }

  notify(text: string, success = true) {

    const notificationContainer = document.createElement('div');
    const notificationText = document.createElement('span');

    notificationContainer.classList.add('diary-notify');
    notificationText.classList.add('notify-text');

    notificationText.innerText = text;
    notificationContainer.appendChild(notificationText);

    if (success) {

      notificationContainer.style.backgroundColor = 'green';
    }
    else {

      notificationContainer.style.backgroundColor = 'red';
    }

    this.notificationStackHeight += 80;
    console.log(this.notificationStackHeight);
    notificationContainer.style.setProperty('--notification-height', this.notificationStackHeight + 'px');

    document.body.appendChild(notificationContainer);
    // todo: edit notification to stack upwards.
    setTimeout(() => {
      document.body.removeChild(notificationContainer);

      if (!document.querySelector('.diary-notify')) {

        this.notificationStackHeight = -70;
      }
    }, 3000);
  }
}
