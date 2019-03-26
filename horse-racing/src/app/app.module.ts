import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProgramComponent } from './program/program.component';
import { AppRoutingModule } from './app-routing.module';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceServiceTestsComponent } from './test/race-service-tests/race-service-tests.component';
import { AddRaceModalComponent } from './add-race-modal/add-race-modal.component';
import { ModalTemplateComponent } from './modal-template.component';
import { DeleteRaceModalComponent } from './delete-race-modal/delete-race-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgramComponent,
    RaceListComponent,
    RaceServiceTestsComponent,
    AddRaceModalComponent,
    ModalTemplateComponent,
    DeleteRaceModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
