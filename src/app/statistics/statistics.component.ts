import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoodService } from '../_services/mood.service';
import { ChartType } from 'angular-google-charts';

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
    colors: ['purple', 'blue', 'red'],
    backgroundColor: 'transparent',
    legend: 'none',
    hAxis: {
      title: 'Moods'
    },
    vAxis: {
      format: '#',
      minValue: 0,
    },
    isStacked: true
  };

  constructor(private moodService: MoodService) {  }

  ngOnInit() {
    this.moodService.getMonthlyMoods().subscribe((resp: any) => {
      this.mood = resp;

      for (const mood of resp) {

        switch (mood.moodValue) {
          case 0:
            this.depressed++;
            break;
          case 1:
            this.content++;
            break;
          case 2:
            this.happy++;
            break;
        }

        this.chartData = this.getChartData();
        this.showChart = true;
      }
    });
  }

  getChartData() {

    return [
      ['Deppresed', this.depressed, 0, 0],
      ['Content', 0, this.content, 0],
      ['Happy', 0, 0, this.happy]
    ];
  }
}
