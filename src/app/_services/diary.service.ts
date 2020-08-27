import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { DiaryEntry } from '../_models/DiaryEntry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  baseUrl = 'http://localhost:5200/api/diary/';
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getAllUserEntries(page: number): Observable<DiaryEntry[]> {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get<DiaryEntry[]>(this.baseUrl + 'get/user/' + userId + ' /entries/page/' + page, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  getOneDiaryEntry(diaryId): Observable<DiaryEntry> {

    const token = localStorage.getItem('token');
    const userId = this.jwtHelper.decodeToken(token).nameid;

    return this.http.get<DiaryEntry>(this.baseUrl + 'get/user/' + userId + '/entry/' + diaryId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  saveDiaryEntry(diaryModel: DiaryEntry) {

    const token = localStorage.getItem('token');

    delete diaryModel.id;

    return this.http.post(this.baseUrl + 'save', diaryModel, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  deleteDiaryEntry(userId: number, diaryId: number) {

    const token = localStorage.getItem('token');

    const diaryEntryToDelete = {
      id: diaryId,
      userId
    };

    return this.http.post(this.baseUrl + 'delete', diaryEntryToDelete, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  editDiaryEntry(diaryModel: DiaryEntry) {

    const token = localStorage.getItem('token');

    return this.http.post(this.baseUrl + 'edit', diaryModel, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}
