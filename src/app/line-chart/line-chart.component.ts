import { Component } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { DataService } from "../data.service";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent {
  objectKeys = Object.keys;
  cryptos: any;

  constructor(private _data: DataService) {}

  ngOnInit() {
    setInterval(() => {

      // this._data.getPrices().subscribe(
      //   (res) => {
      //   this.cryptos = res;
      //   console.table("API cryptocurrency JSON data", this.cryptos.ETH.EUR);
      // });

      // this.lineChartData.forEach((x) => {
      //   const num = this.cryptos.ETH.EUR;
      //   const data: number[] = x.data as number[];
      //   data.push(num);
      // });
      // this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);

    }, 1000);



  }

  // Chart params
  lineChartData: ChartDataSets[] = [
    { data: [], label: "Ethereum (ETH) rate to Euro (EUR)" },
  ];


  lineChartLabels: Label[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

   pushOne() {
    this.lineChartData.forEach((x) => {
      const num = this.cryptos.ETH.EUR;
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public async getAmount() {
    this._data.getPrices().subscribe(
      (res) => {
      this.cryptos = res;
      console.table("API cryptocurrency JSON data", this.cryptos.ETH.EUR);
    });
    this.pushOne();
  }
}
