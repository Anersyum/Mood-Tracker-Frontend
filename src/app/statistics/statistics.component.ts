import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoodService } from '../_services/mood.service';
import { ChartType } from 'angular-google-charts';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  moodCount: any;
  chartType = ChartType.ColumnChart;
  depressed = 0;
  happy = 0;
  content = 0;
  chartData: any;
  showChart = false;
  chartTitle = 'Mood statistics';
  chartOptions = {
    colors: ['#745c97', '#8ac6d1', '#bd574e', 'red', 'green', 'yellow', 'blue', 'violet', 'pink'],
    backgroundColor: 'transparent',
    legend: 'none',
    hAxis: {
      title: 'Moods'
    },
    vAxis: {
      format: '#',
      viewWindowMode: 'explicit',
      viewWindow: {
        min: 0,
        max: 1
      },
    },
    isStacked: true,
    animation: {
      duration: 1000,
      easing: 'inAndOut',
      startup: true
    }
  };

  constructor(private moodService: MoodService, private loadingService: LoadingService) {  }

  ngOnInit() {

    this.loadingService.startLoad();

    this.moodService.getMonthlyMoods().subscribe((resp: any) => {

      this.moodCount = resp;
      console.log(resp);
      // const maxValue = Math.max(...this.mood);

      // this.chartOptions.vAxis.viewWindow.max = (maxValue === 0) ? 1 : maxValue;
      this.chartData = this.getChartData();
      this.showChart = true;
    }, error => {

      console.error(error);
      this.loadingService.stopLoad();
    });
  }

  getChartData() {

    const moodArray = [];

    // moodArray
    return [
      ['Deppresed', this.depressed, 0, 0],
      ['Content', 0, this.content, 0],
      ['Happy', 0, 0, this.happy]
    ];
  }

  stopLoading() {

    this.loadingService.stopLoad();
  }
}
