import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserMood } from '../_models/UserMood';
import { Observable } from 'rxjs';
import { MoodStatistic } from '../_models/MoodStatistic';
import { Mood } from '../_models/Mood';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + 'mood/';

  saveMood(moodModel: UserMood): Observable<any> {

    const token = localStorage.getItem('token');
    return this.http.post(this.baseUrl + 'save', moodModel, {
     headers: {
      Authorization: 'Bearer ' + token
     }
    });
  }

  getMonthlyMoods(): Observable<MoodStatistic[]> {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get<MoodStatistic[]>(this.baseUrl + 'get/statistics/' + userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  getMoodsList(moodName: string): Observable<Mood[]> {

    const token = localStorage.getItem('token');
    moodName = moodName.toLowerCase();

    return this.http.get<Mood[]>(this.baseUrl + 'get/' + moodName, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}
