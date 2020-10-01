import {TestBed} from '@angular/core/testing';

import { GetDataService } from './get-data.service';
import { formatDate } from '@angular/common';
import { of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';


describe('GetDataService', () => {
    let service: GetDataService;
    let mockHttpService;
    let httpTestingController: HttpTestingController;

    const BASE_URL = 'https://api.exchangeratesapi.io/';

    let sampleOneDayRates;

    const initRatesObject: {[key: string]: number} = {
        EUR: 1.1,
        CAN: 1.44
      };

    const sampleResponseRates = {
        base: 'LVL',
        date: new Date(2020, 9, 9),
        rates: initRatesObject
    };

    beforeEach(() => {
    // const spy = jasmine.createSpyObj('HttpClient', ['get']);
    mockHttpService = jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            GetDataService
        ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GetDataService);
});

    it('should be created', () => {
    expect(service).toBeTruthy();
});

    it('should convert object to Array', () => {
    expect(service.objectToArray(initRatesObject))
    .toEqual([{code: 'CAN', rate: 1.44}, {code: 'EUR', rate: 1.1}]);
});

    describe('getLatestExchangeRates', () => {

    it('should call get with the correct URL and return correctly processed data', () => {
        sampleOneDayRates = {
            base: 'LVL',
            date: new Date(2020, 9, 9),
            rates: service.objectToArray(sampleResponseRates.rates)
        };

        service.getLatestExchangeRates().subscribe(
            data => {
                expect(data).toEqual(sampleOneDayRates);
            }
        );

        const requests = httpTestingController.match(BASE_URL + 'latest');
        expect(requests.length).toBe(1);
        requests[0].flush(sampleResponseRates);
        httpTestingController.verify();
    });

    it('should return an error if server not available', () => {
    const mockErrorResponse = {
            error: 'demo 404 error',
            status: 404,
            statusText: 'demo resource not found'
          };
    // const data = 'Invalid request parameters';

    service.getLatestExchangeRates().subscribe(
        data => fail('should be an error scenario'),
        error => {
            expect(error.statusText).toContain('demo resource not found');
        }
    );
    const requests = httpTestingController.match(BASE_URL + 'latest');
    expect(requests.length).toBe(1);
    requests[0].flush(null, mockErrorResponse);
    httpTestingController.verify();
    });

});

    describe('getCustomExchangeRates', () => {
    it('should call get with the correct URL and return correctly processed data', () => {
        sampleOneDayRates = {
            base: 'LVL',
            date: new Date(2020, 9, 9),
            rates: service.objectToArray(sampleResponseRates.rates)
        };

        service.getCustomExchangeRates(sampleResponseRates.base, sampleResponseRates.date).subscribe(
            data => {
                expect(data).toEqual(sampleOneDayRates);
            }
        );

        const dateVal = formatDate(sampleResponseRates.date, 'yyyy-MM-dd', 'en-US', null);
        const requests = httpTestingController.match(BASE_URL + `${dateVal}/?base=${sampleResponseRates.base}`);
        expect(requests.length).toBe(1);
        requests[0].flush(sampleResponseRates);
        httpTestingController.verify(); // test that there are no outstanding subscriptions

    });

    it('should return an error if server not available', () => {
        const mockErrorResponse = {
                error: 'demo 404 error',
                status: 404,
                statusText: 'demo resource not found'
              };
        // const data = 'Invalid request parameters';

        service.getCustomExchangeRates(sampleResponseRates.base, sampleResponseRates.date).subscribe(
            data => fail('should be an error scenario'),
            error => {
                expect(error.statusText).toContain('demo resource not found');
            }
        );
        const dateVal = formatDate(sampleResponseRates.date, 'yyyy-MM-dd', 'en-US', null);
        const requests = httpTestingController.match(BASE_URL + `${dateVal}/?base=${sampleResponseRates.base}`);
        expect(requests.length).toBe(1);
        requests[0].flush(null, mockErrorResponse);
        httpTestingController.verify();
        });
});

    describe('getPeriodExchangeRates', () => {
    it('should call get with the correct URL and return correctly processed data', () => {
        const samplePeriodResponseRates = {
            base: 'LVL',
            end_at: '2020-08-10',
            start_at: '2020-08-08',
            rates: {
                '2020-08-08' : { EUR : 1.1},
                '2020-08-09' : { EUR : 1.2},
                '2020-08-10' : { EUR : 1.3},
            }
        };
        const samplePeriodProcessedRates = {
            base: 'LVL',
            dates: [new Date(2020, 7, 8), new Date(2020, 7, 9), new Date(2020, 7, 10)],
            rates: [1.1, 1.2, 1.3]
        };
        const startDate = new Date(2020, 7, 8);
        const endDate = new Date(2020, 7, 10);
        const startDateVal = formatDate(startDate, 'yyyy-MM-dd', 'en-US', null);
        const endDateVal = formatDate(endDate, 'yyyy-MM-dd', 'en-US', null);

        service.getPeriodExchangeRates('LVL',
        'EUR',
        startDate,
        endDate).subscribe(
            data => {
                expect(data.base).toEqual(samplePeriodProcessedRates.base);
                expect(data.rates).toEqual(samplePeriodProcessedRates.rates);
                for (let i = 0; i < data.dates.length; i++) {
                    expect(data.dates[i].toLocaleDateString()).toEqual(samplePeriodProcessedRates.dates[i].toLocaleDateString());
                }
            }
        );

        const requests = httpTestingController.match(BASE_URL +
            `history?start_at=${startDateVal}&end_at=${endDateVal}&base=LVL&symbols=EUR`);
        expect(requests.length).toBe(1);
        requests[0].flush(samplePeriodResponseRates);
        httpTestingController.verify();
    });

    it('should return an error if server not available', () => {
        const mockErrorResponse = {
                error: 'demo 404 error',
                status: 404,
                statusText: 'demo resource not found'
              };
        const startDate = new Date(2020, 7, 8);
        const endDate = new Date(2020, 7, 10);
        const startDateVal = formatDate(startDate, 'yyyy-MM-dd', 'en-US', null);
        const endDateVal = formatDate(endDate, 'yyyy-MM-dd', 'en-US', null);

        service.getPeriodExchangeRates('LVL',
        'EUR',
        startDate,
        endDate).subscribe(
            data => fail('should be an error scenario'),
            error => {
                expect(error.statusText).toContain('demo resource not found');
            }
        );
        const dateVal = formatDate(sampleResponseRates.date, 'yyyy-MM-dd', 'en-US', null);
        const requests = httpTestingController.match(BASE_URL +
            `history?start_at=${startDateVal}&end_at=${endDateVal}&base=LVL&symbols=EUR`);
        expect(requests.length).toBe(1);
        requests[0].flush(null, mockErrorResponse);
        httpTestingController.verify();
        });
});
});
