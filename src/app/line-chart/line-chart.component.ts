import { Component } from "@angular/core";
import { DataService } from "../data.service";
// Chart imports
import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent {
  objectKeys = Object.keys;
  cryptos: any; // currency's value
  time: any; // snapshot of time to display in  chart label

  constructor(
    private _data: DataService // import DataService
  ) {}

  ngOnInit() {
    this.getAmount(); //getting currency's value first time
    this.getHistoryCurrValue(); // getting currency's history value first time

    // Function to display currency's values for last 10 minutes
    setTimeout(() => {
      // getting value
      this.lineChartData[0] = {
        data: this.cryptos.Data.Data.map((x) => x.close),
        label: "Ethereum (ETH) rate to Euro (EUR)",
      };

      // getting time
      this.lineChartLabels = this.cryptos.Data.Data.map((x) => {
        return new Date(x.time * 1000).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
      });
    }, 2000);


    // function to get new value each new minute;
    setInterval(() => {
      // getting value
      this.getAmount();
      // pushing value to chart
      this.pushOne();
    }, 60 * 1000);
  }

  // CHART PARAMS
  lineChartData: ChartDataSets[] = [
    { data: [], label: "Ethereum (ETH) rate to Euro (EUR)" },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: "Light grey",
      borderColor: "Light grey",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";


  // METHODS

//pushing value to the chart
  pushOne() {
    this.lineChartData.forEach((x) => {
      const num = this.cryptos.ETH.EUR;
      const data: number[] = x.data as number[];
      data.push(num);
    });

    this.time = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    this.lineChartLabels.push(this.time);
  }


  // getting value
  public getAmount() {
    this._data.getPrices().subscribe((res) => {
      this.cryptos = res;
    });
  }


  // getting currency's history value
  getHistoryCurrValue() {
    this._data.getHistory().subscribe((res) => {
      this.cryptos = res;
    });
  }
}
