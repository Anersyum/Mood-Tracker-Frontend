import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5200/api/mood/';

  saveMood(moodModel: any) {

   return this.http.post(this.baseUrl + 'save', moodModel).pipe(
      map((response: any) => {
        const mood = response;

        console.log(mood);
      })
    );
  }

}
