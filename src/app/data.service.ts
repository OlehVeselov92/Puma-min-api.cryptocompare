import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {
  result: any;
  currencyCode: string;
  display: string;

  constructor(private http: HttpClient) {}

  // function to get crypto prices from the API - no API key required.
  getPrices() {
    const fsymsList =
      "ETH";
    return this.http
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
          fsymsList +
          "&tsyms=EUR"
      )
      .pipe(map((result) => (this.result = result)));
  }


    getHistory() {
    return this.http
    .get(
      "https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=EUR&limit=10"
    )
    .pipe(map((result) => (this.result = result)));
  }

}
