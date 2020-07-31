import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5200/api/mood/';

  saveMood(moodModel: any) {

    const token = localStorage.getItem('token');
    return this.http.post(this.baseUrl + 'save', moodModel, {
     headers: {
      Authorization: 'Bearer ' + token
     }
    }).pipe(
      map((response: any) => {
        const mood = response;
      })
    );
  }

  getMonthlyMoods() {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get(this.baseUrl + 'get/' + userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

}
