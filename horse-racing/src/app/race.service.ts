import { Injectable } from '@angular/core';
import { Race } from './race';
import { LocalStorageService } from './local-storage.service';
import { KeyedCollection } from './keyedCollection';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  _keyedRaces: KeyedCollection<Race>;

  private get keyedRaces(): KeyedCollection<Race> {
    if (!this._keyedRaces) {
      this._keyedRaces = new KeyedCollection<Race>();
      let races: Array<Race> = this.localStorageService.readObject<Array<Race>>('hr_races');
      if (!races) {
        races = new Array<Race>();
      }
      for (const race of races) {
        this.setRace(race);
      }
    }
   return this._keyedRaces;
  }

  constructor(
    private localStorageService: LocalStorageService,
  ) {

  }


  public setRace(race: Race) {
    const key = this.getItemKeyFromRace(race);
    this.keyedRaces.Add(key, race);
    this.saveRaces();
  }

  public getRace(track: string, date: Date, number: number): Race {
    const key = this.getItemKey(track, date, number);
    return this.keyedRaces.Item(key);
  }

  public getAllRaces(t): Race[] {
    const allRaces = this.keyedRaces.Values();
    return allRaces;
  }

  private saveRaces() {
    this.localStorageService.writeObject('hr_races', this._keyedRaces.Values());
  }

  private getItemKey(track: string, date: Date, number: number): string {
    const key = track + '_' + date.toDateString() + '_' + number.toString();
    return key;
  }

  private getItemKeyFromRace(race: Race): string {
    return this.getItemKey(race.track, race.date, race.number);
  }

}
