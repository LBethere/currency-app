import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AktualieKursiComponent } from './aktualie-kursi/aktualie-kursi.component';
import { KursaDinamikaComponent } from './kursa-dinamika/kursa-dinamika.component';

const routes: Routes = [
  {path: '', redirectTo: '/aktualie', pathMatch: 'full'},
  {path: 'aktualie', component: AktualieKursiComponent},
  {path: 'dinamika', component: KursaDinamikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
