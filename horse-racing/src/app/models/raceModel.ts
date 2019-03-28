import { Entry } from '../entry';
import { RaceTimeState, Race } from '../race';

export class RaceModel {
  public track: string;
  public date: string;
  public number: number;
  public time: string;
  public entries: Entry[];

  public raceTimeState: RaceTimeState; // TODO: should be in a model
  public minutesToPost: number; // TODO: should be in a model

  public constructor(race: Race) {
    this.track = race.track;
    this.date = race.date;
    this.number = race.number;
    this.time = race.time;
    this.entries = new Array<Entry>();
    for (const raceEntry of race.entries) {
      this.entries.push(raceEntry);
    }
    this.raceTimeState = RaceTimeState.ok;
  }
}
