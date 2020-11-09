import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GetDataService } from '../get-data.service';
import { KursaDinamikaComponent } from './kursa-dinamika.component';
import { of } from 'rxjs';
import {By} from '@angular/platform-browser';

describe('KursaDinamikaComponent', () => {
    let component: KursaDinamikaComponent;
    let fixture: ComponentFixture<KursaDinamikaComponent>;
    let mockGetDataService;

    const startDate: Date = new Date(2020, 5, 1);
    const endDate: Date = new Date(2020, 5, 30);

    const testInitialResponse =
    {base: 'EUR',
    date: new Date(),
    rates: [{code: 'CAN', rate: 1.44}, {code: 'LVL', rate: 1.1}]};

    const testInitialPeriodResponse = {
      base: 'LVL',
      target: 'EUR',
      dates: [new Date(2020, 7, 8), new Date(2020, 7, 9), new Date(2020, 7, 10)],
      rates: [1.1, 1.2, 1.3]
  };

    const testChangedBasePeriodResponse = {
    base: 'CAN',
    target: 'EUR',
    dates: [new Date(2020, 7, 8), new Date(2020, 7, 9), new Date(2020, 7, 10)],
    rates: [1.7, 1.8, 1.9]
};

    const testChangedTargetPeriodResponse = {
  base: 'LVL',
  target: 'CAN',
  dates: [new Date(2020, 7, 8), new Date(2020, 7, 9), new Date(2020, 7, 10)],
  rates: [2.1, 2.2, 2.3]
};

    const testChangedDateRangePeriodResponse = {
  base: 'LVL',
  target: 'EUR',
  dates: [new Date(2020, 1, 8), new Date(2020, 1, 9), new Date(2020, 1, 10)],
  rates: [3.1, 3.2, 3.3]
};

    beforeEach(() => {
        mockGetDataService = jasmine.createSpyObj('GetDataService', ['getLatestExchangeRates', 'getPeriodExchangeRates']);

        TestBed.configureTestingModule({
            imports: [FormsModule, BsDatepickerModule.forRoot()],
            declarations: [KursaDinamikaComponent],
            providers: [ { provide: GetDataService,
                useValue: mockGetDataService }]
        });

        fixture = TestBed.createComponent(KursaDinamikaComponent);
        component = fixture.componentInstance;

        mockGetDataService.getLatestExchangeRates.and.returnValue(of(testInitialResponse));
        mockGetDataService.getPeriodExchangeRates.and.returnValue(of(testInitialPeriodResponse));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render initial data', () => {
        expect(component.baseCurrency).toBe(testInitialResponse.base);
        expect(component.maxDate).toEqual(new Date(testInitialResponse.date));
        expect(component.bsRangeValue).toEqual([startDate, endDate]);

        const targetSelect = fixture.debugElement.query(By.css('#target-currency-select'));
        const baseSelect = fixture.debugElement.query(By.css('#base-currency-select'));
        expect(targetSelect.nativeElement.textContent).toContain(testInitialResponse.base);
        expect(baseSelect.nativeElement.textContent).toContain(testInitialResponse.base);
        for (let i = 1; i < testInitialResponse.rates.length; i++) {
            expect(targetSelect.nativeElement.textContent).toContain(testInitialResponse.rates[i - 1].code);
            expect(baseSelect.nativeElement.textContent).toContain(testInitialResponse.rates[i - 1].code);
        }

        // SHOULD ADD DATERANGE CHECK!!!
        // const inputElem = fixture.debugElement.query(By.css('input'));
        // expect(inputElem.nativeElement).toEqual(testInitialResponse.date.toLocaleDateString());
//        expect(new Date(inputElem.nativeElement.value[1]).toLocaleDateString()).toEqual(testInitialResponse.date.toLocaleDateString());

        expect(component.grafData.chartData[0].data).toEqual(testInitialPeriodResponse.rates);
        expect(component.grafData.chartLabels).toEqual(testInitialPeriodResponse.dates);

        const chartTitle = fixture.debugElement.query(By.css('#chart-title'));
        expect(chartTitle.nativeElement.textContent).toContain(testInitialResponse.base);
        expect(chartTitle.nativeElement.textContent).toContain(component.targetCurrency);
    });

    it('should render data after base change', () => {

      mockGetDataService.getPeriodExchangeRates.and.returnValue(of(testChangedBasePeriodResponse));
      // spyOn(fixture.componentInstance, 'parametersChanged');

      const selectElem = fixture.debugElement.query(By.css('#base-currency-select'));
      selectElem.triggerEventHandler('change', null);

      fixture.detectChanges();

      expect(component.grafData.chartData[0].data).toEqual(testChangedBasePeriodResponse.rates);
      expect(component.grafData.chartLabels).toEqual(testChangedBasePeriodResponse.dates);

      const chartTitle = fixture.debugElement.query(By.css('#chart-title'));
      expect(chartTitle.nativeElement.textContent).toContain(testChangedBasePeriodResponse.base);
      expect(chartTitle.nativeElement.textContent).toContain(testChangedBasePeriodResponse.target);

      // expect(fixture.componentInstance.parametersChanged).toHaveBeenCalledTimes(1);
    });

    it('should render data after target change', () => {
      mockGetDataService.getPeriodExchangeRates.and.returnValue(of(testChangedTargetPeriodResponse));
      spyOn(fixture.componentInstance, 'parametersChanged');

      const selectElem = fixture.debugElement.query(By.css('#target-currency-select'));
      selectElem.triggerEventHandler('change', null);

      fixture.detectChanges();

      expect(component.grafData.chartData[0].data).toEqual(testChangedTargetPeriodResponse.rates);
      expect(component.grafData.chartLabels).toEqual(testChangedTargetPeriodResponse.dates);


      const chartTitle = fixture.debugElement.query(By.css('#chart-title'));
      expect(chartTitle.nativeElement.textContent).toContain(testChangedTargetPeriodResponse.base);
      expect(chartTitle.nativeElement.textContent).toContain(testChangedTargetPeriodResponse.target);

      expect(fixture.componentInstance.parametersChanged).toHaveBeenCalledTimes(1);
    });

    it('should render data after date period change', () => {

    });

    it('should NOT call new data if date period was not changed', () => {

    });



});
