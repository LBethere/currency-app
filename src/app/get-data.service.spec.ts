import {TestBed} from '@angular/core/testing';

import { GetDataService } from './get-data.service';
import { of } from 'rxjs';

describe('GetDataService', () => {
    let service: GetDataService;
    let httpClientSpy: {get: jasmine.Spy}

    const initRatesObject: {[key: string]: number} = {
        EUR: 1.1,
        CAN: 1.44
      }

beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GetDataService(<any>httpClientSpy);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(GetDataService);
});

it('should be created', () => {
    expect(service).toBeTruthy();
});

it('should convert object to Array',
() => {
    expect(service.objectToArray(initRatesObject))
    .toEqual([{code: 'CAN', rate: 1.44}, {code: 'EUR', rate: 1.1}])
})

it('should return Latest exchange rates', () => {

    const sampleResponseRates = {
        base: 'LVL',
        date: new Date(2020,9,9),
        rates: initRatesObject
    }

    httpClientSpy.get.and.returnValue(of(sampleResponseRates));

    service.getLatestExchangeRates().subscribe(
        data => {
            expect(data).toEqual(sampleResponseRates)
        },
        error => {
            fail('there should be no error in this spec')
        }
    );

    expect(httpClientSpy.get.calls.count()).toBe(1 ,'1 call made');
})

})