import { Component, OnInit } from '@angular/core';
import { MoodService } from '../_services/mood.service';
import { ChartType } from 'angular-google-charts';
import { LoadingService } from '../_services/loading.service';
import { MoodStatistic } from '../_models/MoodStatistic';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  moodCount: Array<MoodStatistic>;
  chartType = ChartType.BarChart;
  chartData: any;
  showChart = false;
  chartTitle = 'Mood statistics';
  chartOptions = {
    colors: ['#745c97', '#8ac6d1', '#bd574e', 'red', 'green', 'yellow', 'blue', 'violet', 'pink'],
    backgroundColor: 'transparent',
    legend: 'none',
    role: 'style',
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
    animation: {
      duration: 1000,
      easing: 'inAndOut',
      startup: true
    },
  };
  showNoStatisticsMessage = false;
  chartColumns = [
    {id: 'mood', label: 'Mood', type: 'string'},
    {id: 'moodCount', label: 'Mood Count', type: 'number'},
    {role: 'style', type: 'string'}
  ];

  constructor(private moodService: MoodService, private loadingService: LoadingService) {  }

  ngOnInit() {

   this.getMoodStatistics();
  }

  getChartData() {

    const moodArray = this.fillArrayWithMoodStatistics();

    return moodArray;
  }

  private fillArrayWithMoodStatistics() {

    const savedMoodsDistinct = this.moodCount.length;
    const moodArray = new Array();
    const colorsArray = ['#745c97', '#8ac6d1', '#bd574e', '#89c9b8', '#df7599', '#445c3c', '#142d4c', '#a6b1e1', '#494949', '#d38cad', '#c36a2d'];

    for (let i = 0; i < savedMoodsDistinct; i++) {
      const placeHolderArray = new Array(3);

      placeHolderArray[0] = this.moodCount[i].moodName.charAt(0).toUpperCase() + this.moodCount[i].moodName.slice(1);
      placeHolderArray[1] = this.moodCount[i].count;
      placeHolderArray[2] = colorsArray[i];

      moodArray.push(placeHolderArray);
    }

    return moodArray;
  }

  stopLoading() {

    this.loadingService.stopLoad();
  }

  private getMoodStatistics() {

    this.loadingService.startLoad();

    this.moodService.getMonthlyMoods().subscribe((resp: any) => {

      this.moodCount = resp;

      const moodCountArray = new Array(this.moodCount.length).map((val, index) => this.moodCount[index].count);
      const maxValue = Math.max(...moodCountArray);

      this.chartOptions.vAxis.viewWindow.max = (maxValue === 0) ? 1 : maxValue;
      this.chartData = this.getChartData();
      this.showChart = true;

      if (this.moodCount.length <= 0) {
        this.showNoStatisticsMessage = true;
        this.stopLoading();
      }
    }, error => {

      console.error(error);
      this.stopLoading();
    });
  }
}
