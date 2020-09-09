
import {AktualieKursiComponent} from './aktualie-kursi.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AktualieKursiComponent', () => {
    let component: AktualieKursiComponent;
    let fixture: ComponentFixture<AktualieKursiComponent>;

    beforeEach(async() =>{
        TestBed.configureTestingModule({
            declarations: [AktualieKursiComponent]
        })
        .compileComponents();
    });

    beforeEach(() =>{
        fixture = TestBed.createComponent(AktualieKursiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it ('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display base rate name in the dropdown', () => {
        const aktualieKursiElement: HTMLElement = fixture.nativeElement;
        const selectElem = aktualieKursiElement.querySelector('select');
        expect(selectElem.innerText).toContain('LVL');
    })
})