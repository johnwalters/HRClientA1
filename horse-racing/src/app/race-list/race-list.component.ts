import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit {

  races: Race[];

  constructor(private service: RaceService) { }

  ngOnInit() {
    // TODO: grab races from storage
  }

  promptToAddRace() {

  }

}
