import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit {


  constructor(private service: RaceService) { }

  ngOnInit() {
    // TODO: grab races from storage
  }

  promptToAddRace() {

  }

  races(): Race[] {
    return this.service.getAllRaces();
  }

  raceDeleted(message: any): void {
    // should not have to do anything
  }

}
