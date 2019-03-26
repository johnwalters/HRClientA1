import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/race.service';
import { Race } from 'src/app/race';
import { Entry } from 'src/app/entry';
import * as moment from 'moment';


@Component({
  selector: 'app-race-service-tests',
  templateUrl: './race-service-tests.component.html',
  styleUrls: ['./race-service-tests.component.css']
})
export class RaceServiceTestsComponent implements OnInit {

  log: string;
  todayMDY: string;

  constructor(
    private raceService: RaceService
  ) { }

  ngOnInit() {
    this.todayMDY = moment(new Date()).format('MM-DD-YY');
  }

  runTests(): void {
    this.addLogMessage(' get all existing races');
    const existingRaces = this.raceService.getAllRaces();
    this.addLogMessage(' delete them all');
    for (const existingRace of existingRaces) {
      this.raceService.deleteRace(existingRace.track, existingRace.date, existingRace.number);
    }
    this.addLogMessage(' create a race');
    const race = this.createRace(5);
    this.raceService.setRace(race);
    this.raceService.deleteRace(race.track, race.date, race.number);
    this.raceService.setRace(this.createRace(6));
    this.raceService.setRace(this.createRace(7));
    this.raceService.setRace(this.createRace(8));
    this.raceService.setRace(this.createRace(9));
    this.raceService.clearMemory();

  }

  createRace(number: number): Race {
    const race = new Race();
    race.track = 'DMR';
    race.date = this.todayMDY;
    race.number = number;
    race.entries = new Array<Entry>();
    const entry1 = new Entry(1);
    race.entries.push(entry1);
    const entry2 = new Entry(2);
    race.entries.push(entry2);
    return race;
  }

  races(): Race[] {
    return this.raceService.getAllRaces();
  }

  addLogMessage(message: string) {
    this.log = this.log + message + '\n';
  }

}
