import { Injectable } from '@angular/core';
import { Race } from './race';
import { LocalStorageService } from './local-storage.service';
import { KeyedCollection } from './keyedCollection';
import { Entry } from './entry';

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

  public static createRace(track: string, date: string, number: number): Race {
    const race = new Race();
    race.track = track;
    race.date = date;
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
    race.entries.push(new Entry(13));
    race.entries.push(new Entry(14));
    race.entries.push(new Entry(15));
    return race;
  }

  public setRace(race: Race) {
    const key = this.getItemKeyFromRace(race);
    this.keyedRaces.Add(key, race);
    this.saveRaces();
  }

  public getRace(track: string, date: string, number: number): Race {
    const key = this.getItemKey(track, date, number);
    return this.keyedRaces.Item(key);
  }

  public getAllRaces(): Race[] {
    const allRaces = this.keyedRaces.Values();
    return allRaces;
  }

  public deleteRace(track: string, date: string, number: number): void {
    const key = this.getItemKey(track, date, number);
    this.keyedRaces.Remove(key);
    this.saveRaces();
  }

  public clearMemory(): void {
    this._keyedRaces = null;
  }

  private saveRaces() {
    this.localStorageService.writeObject('hr_races', this._keyedRaces.Values());
  }

  private getItemKey(track: string, date: string, number: number): string {
    const key = track + '_' + date + '_' + number.toString();
    return key;
  }

  private getItemKeyFromRace(race: Race): string {
    return this.getItemKey(race.track, race.date, race.number);
  }

}
