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
    });
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

  getMoodsList(moodName: string) {

    const token = localStorage.getItem('token');
    moodName = moodName.toLowerCase();

    return this.http.get(this.baseUrl + 'get/' + moodName, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}
