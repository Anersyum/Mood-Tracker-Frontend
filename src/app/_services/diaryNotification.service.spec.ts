/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiaryNotificationService } from './diaryNotification.service';

describe('Service: DiaryNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiaryNotificationService]
    });
  });

  it('should ...', inject([DiaryNotificationService], (service: DiaryNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
