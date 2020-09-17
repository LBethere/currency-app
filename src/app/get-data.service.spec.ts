import {TestBed} from '@angular/core/testing';

import { GetDataService } from './get-data.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('GetDataService', () => {
    let service: GetDataService;
    //let httpClientSpy: {get: jasmine.Spy}
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    const initRatesObject: {[key: string]: number} = {
        EUR: 1.1,
        CAN: 1.44
      }

    const sampleResponseRates = {
        base: 'LVL',
        date: new Date(2020,9,9),
        rates: initRatesObject
    }    

beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
        providers: [
            GetDataService,
            {provide: HttpClient, useValue: spy}
        ]
    });

    service = TestBed.inject(GetDataService);
    httpClientSpy = TestBed.inject(HttpClient) as 
    jasmine.SpyObj<HttpClient>;

    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // service = new GetDataService(<any>httpClientSpy);
    // TestBed.configureTestingModule({});
    //service = TestBed.inject(GetDataService);

});

afterEach(() => {
    service = null;
    httpClientSpy = null;
})

it('should be created', () => {
    expect(service).toBeTruthy();
});

it('should convert object to Array', () => {
    expect(service.objectToArray(initRatesObject))
    .toEqual([{code: 'CAN', rate: 1.44}, {code: 'EUR', rate: 1.1}])
})

it('should return Latest exchange rates', () => {

    const sampleOneDayRates = {
        base: 'LVL',
        date: new Date(2020,9,9),
        rates: service.objectToArray(sampleResponseRates.rates)
    }

    httpClientSpy.get.and.returnValue(of(sampleResponseRates));

    service.getLatestExchangeRates().subscribe(
        data => {
            expect(data).toEqual(sampleOneDayRates)
        },
        error => {
            fail('there should be no error in this spec')
        }
    );

    expect(httpClientSpy.get.calls.count()).toBe(1 ,'1 call made');
});

it('should return exchange rates for custom date', () => {

    const sampleOneDayRates = {
        base: 'LVL',
        date: new Date(2020,9,9),
        rates: service.objectToArray(sampleResponseRates.rates)
    }

    httpClientSpy.get.and.returnValue(of(sampleResponseRates));

    service.getCustomExchangeRates(sampleResponseRates.base, sampleResponseRates.date).subscribe(
        data => {
            expect(data).toEqual(sampleOneDayRates)
        },
        error => {
            fail('there should be no error in this spec')
        }
    );

    expect(httpClientSpy.get.calls.count()).toBe(1 ,'1 call made');
})

})