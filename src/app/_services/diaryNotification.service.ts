import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaryNotificationService {

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

    document.body.appendChild(notificationContainer);

    setTimeout(() => {
      document.body.removeChild(notificationContainer);
    }, 3000);
  }
}
