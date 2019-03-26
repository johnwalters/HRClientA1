import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/race.service';
import { Race } from 'src/app/race';
import { Entry } from 'src/app/entry';
import { Utilities } from 'src/app/utilities';


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
    this.todayMDY = Utilities.getTodayMMDDYY();
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
    race.entries.push(new Entry(1));
    race.entries.push(new Entry(2));
    race.entries.push(new Entry(3));
    race.entries.push(new Entry(4));
    race.entries.push(new Entry(5));
    race.entries.push(new Entry(6));
    race.entries.push(new Entry(7));
    race.entries.push(new Entry(8));
    race.entries.push(new Entry(9));
    race.entries.push(new Entry(10));
    race.entries.push(new Entry(11));
    race.entries.push(new Entry(12));
    return race;
  }

  races(): Race[] {
    return this.raceService.getAllRaces();
  }

  addLogMessage(message: string) {
    this.log = this.log + message + '\n';
  }

}
