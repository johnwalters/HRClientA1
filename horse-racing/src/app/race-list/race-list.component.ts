import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { Utilities } from '../utilities';
import { MinutesToPost } from '../MinutesToPost';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements OnInit {
  currentTime: string;
  minutesToPostFirstRace: number;

  constructor(private service: RaceService) {}

  ngOnInit() {
    this.currentTime = Utilities.getNowHHMMSSa();
    this.tickTock();
  }

  promptToAddRace() {}

  races(): Race[] {
    return this.service.getAllRaces();
  }

  raceDeleted(message: any): void {
    // should not have to do anything
  }

  tickTock(): void {
    setInterval(() => {
      this.currentTime = Utilities.getNowHHMMSSa();
      this.minutesToPostFirstRace = null;

      for (const minToPostRace of this.races()) {
        const minutesToPost: MinutesToPost = Utilities.getRaceTimeState(minToPostRace);
        minToPostRace.minutesToPost = minutesToPost.minutesToPost;
        minToPostRace.raceTimeState = minutesToPost.raceTimeState;
      }
    }, 1000);
  }
}
