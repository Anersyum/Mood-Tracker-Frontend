import { Component, OnInit } from '@angular/core';
import { MoodService } from '../_services/mood.service';
import { ChartType } from 'angular-google-charts';
import { LoadingService } from '../_services/loading.service';
import { MoodStatistic } from '../_models/MoodStatistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  moodCount: Array<MoodStatistic>;
  chartType = ChartType.ColumnChart;
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
  showNoStatisticsMessage = false;

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
    const moodArray = new Array(savedMoodsDistinct).fill(0).map(() => new Array(savedMoodsDistinct + 1).fill(0));

    for (let i = 0; i < moodArray.length; i++) {

      moodArray[i][0] = this.moodCount[i].moodName.charAt(0).toUpperCase() + this.moodCount[i].moodName.slice(1);
      moodArray[i][i + 1] = this.moodCount[i].count;
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
