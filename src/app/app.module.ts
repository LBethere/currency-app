import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AktualieKursiComponent } from './aktualie-kursi/aktualie-kursi.component';
import { KursaDinamikaComponent } from './kursa-dinamika/kursa-dinamika.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {GetDataService} from './get-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExerciseTestComponent } from './exercise-test/exercise-test.component';
import { TrainingComponent } from './training/training.component';
import { FormTrainingComponent } from './form-training/form-training.component';
import { Form1Component } from './form-training/form1/form1.component';

@NgModule({
  declarations: [
    AppComponent,
    AktualieKursiComponent,
    KursaDinamikaComponent,
    NavBarComponent,
    ExerciseTestComponent,
    TrainingComponent,
    FormTrainingComponent,
    Form1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
