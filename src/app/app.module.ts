import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { DataService } from "./data.service";

import { ChartsModule } from "ng2-charts";
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [AppComponent, LineChartComponent],
  imports: [BrowserModule, HttpClientModule, ChartsModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}


