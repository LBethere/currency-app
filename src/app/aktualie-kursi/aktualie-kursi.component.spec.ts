
import {AktualieKursiComponent} from './aktualie-kursi.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';
import { GetDataService } from '../get-data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';

const testInitialResponse = 
  {base: 'EUR', 
  date: new Date(), 
  rates: [{code: 'CAN', rate: 1.44}, {code: 'LVL', rate: 1.1}]};

const testRateChangedResponse = 
  {base: 'LVL', 
  date: new Date(), 
  rates: [{code: 'CAN', rate: 1.2}, {code: 'EUR', rate: 0.2}]};

const testDateChangedResponse = 
  {base: 'EUR', 
  date: new Date(2020,9,15), 
  rates: [{code: 'CAN', rate: 1.3}, {code: 'LVL', rate: 1.6}]};

describe('AktualieKursiComponent', () => {
    let component: AktualieKursiComponent;
    let fixture: ComponentFixture<AktualieKursiComponent>;
    let spyService;

    beforeEach(() =>{

        spyService = jasmine.createSpyObj('GetDataService', ['getLatestExchangeRates', 'getCustomExchangeRates']);

        TestBed.configureTestingModule({
            imports: [FormsModule, BsDatepickerModule.forRoot()],
            declarations: [AktualieKursiComponent],
            providers: [ { provide: GetDataService, 
                useValue: spyService }]
        });
        fixture = TestBed.createComponent(AktualieKursiComponent);
        component = fixture.componentInstance;
        spyService.getLatestExchangeRates.and.returnValue(of(testInitialResponse));
        fixture.detectChanges();
    });

    it ('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('should render initial data: select options, date, table', () => {

        const optionElems = fixture.debugElement.queryAll(By.css('option'));
        expect(optionElems[0].nativeElement.textContent).toContain(testInitialResponse.base);
        for (let i=1; i<testInitialResponse.rates.length; i++) {
            expect(optionElems[i].nativeElement.textContent).toContain(testInitialResponse.rates[i-1].code);
        }

        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(new Date(inputElem.nativeElement.value).toLocaleDateString()).toEqual(testInitialResponse.date.toLocaleDateString());

        const tableRows = fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
        for (let i=0; i<testInitialResponse.rates.length;i++) {
            expect(tableRows[i].nativeElement.textContent).toContain(testInitialResponse.rates[i].code);
            expect(tableRows[i].nativeElement.textContent).toContain(testInitialResponse.rates[i].rate.toString());
        }

    });

    it ('should render correct data after rate change', () => {
        spyService.getCustomExchangeRates.and.returnValue(of(testRateChangedResponse));

        const selectElem = fixture.debugElement.query(By.css('select'));
        selectElem.triggerEventHandler('change', null);

        fixture.detectChanges();

        const optionElems = fixture.debugElement.queryAll(By.css('option'));
        expect(optionElems[0].nativeElement.textContent).toContain(testRateChangedResponse.base);
        for (let i=1; i<testRateChangedResponse.rates.length; i++) {
            expect(optionElems[i].nativeElement.textContent).toContain(testRateChangedResponse.rates[i-1].code);
        }

        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(new Date(inputElem.nativeElement.value).toLocaleDateString()).toEqual(testRateChangedResponse.date.toLocaleDateString());

        const tableRows = fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
        for (let i=0; i<testRateChangedResponse.rates.length;i++) {
            expect(tableRows[i].nativeElement.textContent).toContain(testRateChangedResponse.rates[i].code);
            expect(tableRows[i].nativeElement.textContent).toContain(testRateChangedResponse.rates[i].rate.toString());
        }
    })

    it('should render correct data after date change', () => {
        spyService.getCustomExchangeRates.and.returnValue(of(testDateChangedResponse));

        const inputElem = fixture.debugElement.query(By.css('input'));
        inputElem.triggerEventHandler('bsValueChange', testDateChangedResponse.date);

        fixture.detectChanges();

        const optionElems = fixture.debugElement.queryAll(By.css('option'));
        expect(optionElems[0].nativeElement.textContent).toContain(testDateChangedResponse.base);
        for (let i=1; i<testDateChangedResponse.rates.length; i++) {
            expect(optionElems[i].nativeElement.textContent).toContain(testDateChangedResponse.rates[i-1].code);
        }

        //const inputElem = fixture.debugElement.query(By.css('input'));
        expect(new Date(inputElem.nativeElement.value).toLocaleDateString()).toEqual(testDateChangedResponse.date.toLocaleDateString());

        const tableRows = fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
        for (let i=0; i<testDateChangedResponse.rates.length;i++) {
            expect(tableRows[i].nativeElement.textContent).toContain(testDateChangedResponse.rates[i].code);
            expect(tableRows[i].nativeElement.textContent).toContain(testDateChangedResponse.rates[i].rate.toString());
        }
    });

    it('should NOT call new data if date was not changed', () => {
        spyOn(fixture.componentInstance, 'parametersChanged');
        component.activeDate = testDateChangedResponse.date;

        const inputElem = fixture.debugElement.query(By.css('input'));
        inputElem.triggerEventHandler('bsValueChange', testDateChangedResponse.date);

        fixture.detectChanges();

        expect(fixture.componentInstance.parametersChanged).not.toHaveBeenCalled();
    })
})