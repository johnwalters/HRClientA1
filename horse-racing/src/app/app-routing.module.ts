import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { RaceServiceTestsComponent } from './test/race-service-tests/race-service-tests.component';

const routes: Routes = [
  { path: '', redirectTo: 'program', pathMatch: 'full' },
  { path: 'program', component: ProgramComponent },
  { path: 'tests/raceservice', component: RaceServiceTestsComponent },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { }
