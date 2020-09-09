import { Component, OnInit, OnDestroy } from '@angular/core';
import {GetDataService, ProcRates} from './../get-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aktualie-kursi',
  templateUrl: './aktualie-kursi.component.html',
  styleUrls: ['./aktualie-kursi.component.css']
})
export class AktualieKursiComponent implements OnInit, OnDestroy {

  initSub: Subscription;
  baseDateChangeSub: Subscription;

  baseCurrency: string;
  activeDate: Date;
  tableData: {code: string, rate: number}[];

  // settingi datepicker
  maxDate: Date;
  minDate: Date = new Date(1999, 0, 1);

  // TESTING
  initRatesArray: {code: string, rate: number}[] = 
  [{code: 'CAN', rate: 1.44}, {code: 'EUR', rate: 1.1}]

  constructor(
    //private getDataService: GetDataService
  ) { }

  ngOnInit() {
    // this.initSub = this.getDataService.getLatestExchangeRates().subscribe(
    //   data => {
    //     this.maxDate = new Date(data.date);
    //     this.prepareData(data);
    //   },
    //   error => {
    //     // error handling
    //   }
    // );

    // TESTING
    this.prepareData({base: 'LVL', date: new Date(), rates: this.initRatesArray})
  }

  prepareData(data: ProcRates) {
    this.baseCurrency = data.base;
    this.activeDate = new Date(data.date);
    this.tableData = data.rates;
  }


  dateChanged(e: any) {
    if (e && this.activeDate.valueOf() !== new Date(e).valueOf()) {
      this.activeDate = new Date(e);
      this.parametersChanged();
    }
  }

  parametersChanged() {
    // this.baseDateChangeSub = this.getDataService.getCustomExchangeRates(this.baseCurrency, this.activeDate)
    // .subscribe(
    //   data => {
    //     this.prepareData(data);
    //   },
    //   error => {
    //     // error handling
    //   }
    // );
  }

  ngOnDestroy() {
    if (this.initSub) {
      this.initSub.unsubscribe();
    }
    if (this.baseDateChangeSub) {
      this.baseDateChangeSub.unsubscribe();
    }
  }

}
