import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GetDataService } from '../get-data.service';
import { KursaDinamikaComponent } from "./kursa-dinamika.component";
import { of } from 'rxjs';

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

    const testLatestValuesResponse = {

    }

    const testInitialPeriodResponse = {

    }

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

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render initial data', () => {
        mockGetDataService.getLatestExchangeRates.and.returnValue(of(testLatestValuesResponse));
        fixture.detectChanges();
    });

    it('should render data after base rate change', () => {

    });

    it('should render data after target rate change', () => {

    });

    it('should render data after date period change', () => {

    });

    it('should NOT call new data if date period was not changed', () => {

    });



})