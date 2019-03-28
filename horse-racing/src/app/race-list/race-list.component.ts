import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { Utilities } from '../utilities';
import { MinutesToPost } from '../MinutesToPost';
import { RaceModel } from '../models/raceModel';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit {
  currentTime: string;
  minutesToPostFirstRace: number;
  raceModels: RaceModel[];

  constructor(private service: RaceService) {}

  ngOnInit() {
    this.currentTime = Utilities.getNowHHMMSSa();
    this.refresh();
    this.tickTock();
  }

  promptToAddRace() {}

  getRaceModels(): RaceModel[] {
    const races = this.service.getAllRaces();
    const models = new Array<RaceModel>();
    for (const race of races) {
      models.push(new RaceModel(race));
    }
    return models;
  }

  raceDeleted(message: any): void {
    this.refresh();
    // should not have to do anything
  }

  getRaceMinutesToPostStateClass(race: RaceModel): any {
    let mtpClass = 'min-post-' + 'ok';
    if (race.raceTimeState) {
      mtpClass = 'min-post-' + race.raceTimeState;
    }
    return mtpClass;
  }

  tickTock(): void {
    setInterval(() => {
      this.refresh();
    }, 10000);
  }

  refresh() {
    this.currentTime = Utilities.getNowHHMMSSa();
    this.minutesToPostFirstRace = null;
    this.raceModels = this.getRaceModels();
    for (const minToPostRace of this.raceModels) {
      const minutesToPost: MinutesToPost = Utilities.getRaceTimeState(
        minToPostRace
      );
      minToPostRace.minutesToPost = minutesToPost.minutesToPost;
      minToPostRace.raceTimeState = minutesToPost.raceTimeState;
    }
  }
}
