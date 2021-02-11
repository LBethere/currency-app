import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AktualieKursiComponent } from './aktualie-kursi/aktualie-kursi.component';
import { KursaDinamikaComponent } from './kursa-dinamika/kursa-dinamika.component';
import { TrainingComponent } from './training/training.component';
import { FormTrainingComponent } from './form-training/form-training.component';

const routes: Routes = [
  {path: '', redirectTo: '/aktualie', pathMatch: 'full'},
  { path: 'formExamples', component: FormTrainingComponent },
  {path: 'aktualie', component: AktualieKursiComponent},
  {path: 'dinamika', component: KursaDinamikaComponent},
  { path: 'training', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
