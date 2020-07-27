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

  mood: any;
  chartType = ChartType.ColumnChart;
  depressed = 0;
  happy = 0;
  content = 0;
  chartData: any;
  showChart = false;
  chartTitle = 'Mood statistics';
  chartOptions = {
    colors: ['#745c97', '#8ac6d1', '#bd574e'],
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
    isStacked: true
  };

  constructor(private moodService: MoodService, private loadingService: LoadingService) {  }

  ngOnInit() {
    
    this.loadingService.startLoad();

    this.moodService.getMonthlyMoods().subscribe((resp: any) => {
      this.mood = resp;

      this.depressed = this.mood[0];
      this.content = this.mood[1];
      this.happy = this.mood[2];

      const maxValue = Math.max(...this.mood);

      this.chartOptions.vAxis.viewWindow.max = (maxValue === 0) ? 1 : maxValue;
      this.chartData = this.getChartData();
      this.showChart = true;
    });
  }

  getChartData() {

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
