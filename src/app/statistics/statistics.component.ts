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

      const moodCountArray = new Array(this.moodCount.length).map((val, index) => this.moodCount[index].count);
      const maxValue = Math.max(...moodCountArray);

      this.chartOptions.vAxis.viewWindow.max = (maxValue === 0) ? 1 : maxValue;
      this.chartData = this.getChartData();
      this.showChart = true;
    }, error => {

      console.error(error);
      this.loadingService.stopLoad();
    });
  }

  getChartData() {

    const savedMoodsDistinct = this.moodCount.length;
    const moodArray = new Array(savedMoodsDistinct).fill(0).map(() => new Array(savedMoodsDistinct + 1).fill(0));

    for (let i = 0; i < moodArray.length; i++) {

      moodArray[i][0] = this.moodCount[i].moodName;
      moodArray[i][i + 1] = this.moodCount[i].count;
    }
    console.log(moodArray);
    return moodArray;
  }

  stopLoading() {

    this.loadingService.stopLoad();
  }
}
