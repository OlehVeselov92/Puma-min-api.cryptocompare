import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {
  result: any;
  currencyCode: string;
  display: string;

  constructor(private http: HttpClient) {}

  // function to get crypto price from the API

  getPrices() {
    const fsymsList =
      "ETH";  //Could be added several currencies
    return this.http
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
          fsymsList +
          "&tsyms=EUR"
      )
      .pipe(map((result) => (this.result = result)));
  }

// function to get crypto prices for last 10 minutes
    getHistory() {
    return this.http
    .get(
      "https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=EUR&limit=10" //limit - number of minutes;
    )
    .pipe(map((result) => (this.result = result)));
  }

}
