import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  baseUrl = 'http://localhost:5200/api/diary/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getAllUserEntries() {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get(this.baseUrl + 'get/user/' + userId + ' /entries', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  getOneDiaryEntry(diaryId) {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get(this.baseUrl + 'get/user/' + userId + '/entry/' + diaryId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  saveDiaryEntry(diaryModel: any) {

    const token = localStorage.getItem('token');

    return this.http.post(this.baseUrl + 'save', diaryModel, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

}
