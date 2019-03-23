import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  { path: '', redirectTo: 'program', pathMatch: 'full' },
  { path: 'program', component: ProgramComponent },
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { }
