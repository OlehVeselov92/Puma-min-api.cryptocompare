import { Component } from "@angular/core";
import { ChartDataSets } from "chart.js";
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
  time: any;

  constructor(private _data: DataService) {}

  ngOnInit() {
    this.getAmount();
    this.getHistoryCurrValue();

    setTimeout(() => {

      this.lineChartData[0] = {
        data: this.cryptos.Data.Data.map((x) => x.close),
        label: "Ethereum (ETH) rate to Euro (EUR)"
      };

      this.lineChartLabels = this.cryptos.Data.Data.map(
        (x) => {
          return new Date(x.time * 1000).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          })
        }
      )
    }, 2000);




    setInterval(() => {
      this.getAmount();
      this.pushOne();
    }, 5000);
  }

  // Chart params
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

  public getAmount() {
    this._data.getPrices().subscribe((res) => {
      this.cryptos = res;
    });
  }

    getHistoryCurrValue() {
    this._data.getHistory().subscribe((res) => {
      this.cryptos = res;
    });
  }

}
