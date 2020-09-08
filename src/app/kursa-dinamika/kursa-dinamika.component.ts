import { Component, OnInit, OnDestroy } from '@angular/core';
import {GetDataService, ProcPeriodRates} from './../get-data.service';
import { Subscription } from 'rxjs';
import { DefaultChartSettings } from './chart-settings';

@Component({
  selector: 'app-kursa-dinamika',
  templateUrl: './kursa-dinamika.component.html',
  styleUrls: ['./kursa-dinamika.component.css']
})
export class KursaDinamikaComponent implements OnInit, OnDestroy {

  initSub: Subscription;
  baseDateChangeSub: Subscription;

  baseCurrency: string;
  targetCurrency: string;
  startDate: Date = new Date(2020, 5, 1);
  endDate: Date = new Date(2020, 5, 30);

  // values for daterangepicker options
  bsRangeValue: Date[];
  maxDate: Date;
  minDate: Date = new Date(1999, 0, 1);

  dropdownValues: string[];

  grafData: DefaultChartSettings = new DefaultChartSettings();

  constructor(
    private getDataService: GetDataService) {
    }

  ngOnInit() {

    this.dropdownValues = [];
    this.bsRangeValue = [this.startDate, this.endDate];

    this.initSub = this.getDataService.getLatestExchangeRates().subscribe(
      data => {

        this.baseCurrency = data.base;
        this.maxDate = new Date(data.date);

        for (const elem of data.rates) {
          this.dropdownValues.push(elem.code);
                }

        this.targetCurrency = this.dropdownValues[0];
        this.dropdownValues.push(this.baseCurrency);
        this.dropdownValues.sort();

        this.parametersChanged();
      },
      error => {
        // error handling
      }
    );
  }

  dateChanged(e) {
    if (e && (this.startDate.valueOf() !== new Date(e[0]).valueOf() ||
    this.endDate.valueOf() !== new Date(e[1]).valueOf())) {
      this.startDate = new Date(e[0]);
      this.endDate = new Date(e[1]);
      this.parametersChanged();
    }
  }

  parametersChanged() {
    this.baseDateChangeSub = this.getDataService.getPeriodExchangeRates(this.baseCurrency,
      this.targetCurrency, this.startDate, this.endDate)
    .subscribe(
      data => {
        this.grafData.chartLabels = data.dates;
        this.grafData.chartData[0].data = data.rates;
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
