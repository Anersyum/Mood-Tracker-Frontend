import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = false;

  constructor() { }

  startLoad() {

    this.loading = true;
  }

  isLoading() {

    return this.loading;
  }

  stopLoad() {

    this.loading = false;
  }
}
