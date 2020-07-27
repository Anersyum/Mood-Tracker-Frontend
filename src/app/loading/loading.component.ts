import { Component, OnInit, DoCheck } from '@angular/core';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements DoCheck {

  isLoading = false;

  constructor(private loadingService: LoadingService) { }

  ngDoCheck(): void {

    this.isLoading = this.loadingService.isLoading();
    console.log(this.loadingService.isLoading());
  }

}
