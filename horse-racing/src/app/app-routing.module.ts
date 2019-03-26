import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { RaceServiceTestsComponent } from './test/race-service-tests/race-service-tests.component';
import { RaceListComponent } from './race-list/race-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'races', pathMatch: 'full' },
  { path: 'program', component: ProgramComponent },
  { path: 'race/:track/:date/:number', component: ProgramComponent },
  { path: 'races', component: RaceListComponent },
  { path: 'tests/raceservice', component: RaceServiceTestsComponent },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { }
