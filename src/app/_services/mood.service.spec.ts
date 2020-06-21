/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoodService } from './mood.service';

describe('Service: Mood', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodService]
    });
  });

  it('should ...', inject([MoodService], (service: MoodService) => {
    expect(service).toBeTruthy();
  }));
});
