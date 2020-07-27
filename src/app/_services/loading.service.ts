import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading = false;

  constructor() { }

  startLoad() {

    this.loading = true;
  }

  stopLoad() {

    this.loading = false;
  }
}
