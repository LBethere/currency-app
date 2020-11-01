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

  constructor(
    private getDataService: GetDataService
  ) { }

  ngOnInit() {
    // let now = new Date();
    // now.setHours(now.getHours()+1);
    // document.cookie = "name2=name2;";
    //document.cookie = "expires=" + now.toUTCString() + ";"
    //console.log(document.cookie.split(';'));
    this.initSub = this.getDataService.getLatestExchangeRates().subscribe(
      data => {
        this.maxDate = new Date(data.date);
        this.prepareData(data);
      },
      error => {
        // error handling
      }
    );
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
    this.baseDateChangeSub = this.getDataService.getCustomExchangeRates(this.baseCurrency, this.activeDate)
    .subscribe(
      data => {
        this.prepareData(data);
      },
      error => {
        // error handling
      }
    );
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
