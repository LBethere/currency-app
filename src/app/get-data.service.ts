import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const BASE_URL = 'https://api.exchangeratesapi.io/';

export interface OneRate {
  code: string;
  rate: number;
}

interface SingleDayRates {
  base: string;
  date: Date;
  rates: {[key: string]: number};
}

export interface ProcRates {
  base: string;
  date: Date;
  rates: OneRate[];
}

interface PeriodRates {
  base: string;
  end_at: string;
  start_at: string;
  rates: {[key: string]: {key: number}};
}

export interface ProcPeriodRates {
  base: string;
  dates: Date[];
  rates: number[];
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(
    private http: HttpClient
  ) { }

  objectToArray(ratesObject: {[key: string]: number}) {
    const rateArray: OneRate[] = [];
    for (const key in ratesObject) {
      if (ratesObject.hasOwnProperty(key)) {
        rateArray.push({code: key.toString(), rate: ratesObject[key]});
      }
    }
    rateArray.sort((item1, item2) => (item1.code > item2.code) ? 1 : ((item2.code > item1.code) ? -1 : 0));
    return rateArray;
  }

  getLatestExchangeRates(): Observable<ProcRates> {
    const dataURL: string = BASE_URL + 'latest';
    return this.http.get<SingleDayRates>(dataURL).pipe(
      map( responseData => {
        const rateArray: OneRate[] = this.objectToArray(responseData.rates);
        return {base: responseData.base, date: responseData.date, rates: rateArray};
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
      );

  }

  getCustomExchangeRates(baseCurrency: string, date: Date): Observable<ProcRates> {
    const dateVal = formatDate(date, 'yyyy-MM-dd', 'en-US', null);
    const dataURL: string = BASE_URL + `${dateVal}/?base=${baseCurrency}`;
    return this.http.get<SingleDayRates>(dataURL).pipe(
      map( responseData => {
        const rateArray: OneRate[] = this.objectToArray(responseData.rates);
        return {base: responseData.base, date: responseData.date, rates: rateArray};
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
      );
  }

  getPeriodExchangeRates(baseCurrency: string, targetCurrency: string, startDate: Date, endDate: Date): Observable<ProcPeriodRates> {
    const fromDateVal = formatDate(startDate, 'yyyy-MM-dd', 'en-US', null);
    const toDateVal = formatDate(endDate, 'yyyy-MM-dd', 'en-US', null);
    const dataURL: string = BASE_URL + `history?start_at=${fromDateVal}&end_at=${toDateVal}&base=${baseCurrency}&symbols=${targetCurrency}`;
    return this.http.get<PeriodRates>(dataURL).pipe(
      map( responseData => {
        const dateArray: Date[] = [];
        const valueArray: number[] = [];
        // SAkartoshana secigi pec datumiem nepiecieshama grafika labels
        Object.keys(responseData.rates).sort().forEach(
          keyName => {
            dateArray.push(new Date(keyName));
            valueArray.push(responseData.rates[keyName][targetCurrency]);
          }
        );
        return {base: responseData.base, dates: dateArray, rates: valueArray};
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
      );
  }
}
