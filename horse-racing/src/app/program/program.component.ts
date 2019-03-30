import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { OddsManager } from '../oddsManager';
import { OddsMethod } from '../oddsMethod';
import { KeyedCollection } from '../keyedCollection';
import { OddsMethodItem } from '../oddsMethodItem';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { Utilities } from '../utilities';
import { Track } from '../track';
import { TrackService } from '../track.service';
import { MinutesToPost } from '../MinutesToPost';
import { RaceModel } from '../models/raceModel';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  // TODO: allow scrathced entries
  // TODO: Add race modal - number fields for race number and mtp

  race: Race;
  raceModel: RaceModel;
  track: Track;
  raceTimeHhmma: string;
  // entries: Entry[];
  oddsManager: OddsManager;
  oddsMethod: OddsMethod;
  oddsMethodResults: KeyedCollection<OddsMethodItem>;
  private parameterSubscription: any;
  totalEntries: number;
  isTrackEditMode: boolean;
  externalRaceUrl: string;

  constructor(
    private raceService: RaceService,
    private trackService: TrackService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.race = new Race();
    this.initEntries();
    this.oddsManager = new OddsManager();
    this.oddsMethod = new OddsMethod();
    this.oddsMethodResults = new KeyedCollection<OddsMethodItem>();
    this.parameterSubscription = this.route.params.subscribe(params => {
      const track = params['track'];
      const date = params['date'];
      const number = params['number'];
      this.race = this.raceService.getRace(track, date, number);
      this.raceModel = new RaceModel(this.race);
      this.raceTimeHhmma = Utilities.getRaceTimeHhmma(this.race);
      this.totalEntries = this.race.entries.length;
      this.track = this.trackService.getTrack(this.race.track);
      this.externalRaceUrl = Utilities.getExternalRaceUrl(this.race);
      this.refresh();
      this.tickTock();
    });
  }

  initEntries() {
    this.race.entries = new Array<Entry>();
    for (let i = 1; i < 13 ; i++) {
      this.race.entries.push(new Entry(i));
    }
  }

  toggleTrainer(entry: Entry) {
    entry.isTrainerGood = !entry.isTrainerGood;
    this.raceService.setRace(this.race);
  }

  incrementOdds(entry: Entry, isFiveMinute: boolean) {
    // if (!entry.fiveMinuteOdds || !entry.fiveMinuteOdds.displayed) return;
    if (isFiveMinute) {
      // const displayed: string = entry.fiveMinuteOdds.displayed.toString();
      entry.fiveMinuteOdds = this.oddsManager.increment(entry.fiveMinuteOdds.displayed);
    } else {
      entry.oneMinuteOdds = this.oddsManager.increment(entry.oneMinuteOdds.displayed);
      this.callOddsMethod();
    }
  }

  decrementOdds(entry: Entry, isFiveMinute: boolean) {
    // if (!entry.fiveMinuteOdds || !entry.fiveMinuteOdds.displayed) return;
    if (isFiveMinute) {
      entry.fiveMinuteOdds = this.oddsManager.decrement(entry.fiveMinuteOdds.displayed);
    } else {
      entry.oneMinuteOdds = this.oddsManager.decrement(entry.oneMinuteOdds.displayed);
      this.callOddsMethod();
    }
  }

  copyOdds() {
    for (const odds of this.race.entries) {
      odds.oneMinuteOdds = odds.fiveMinuteOdds;
    }
    this.callOddsMethod();
  }

  callOddsMethod() {
    this.oddsMethodResults = this.oddsMethod.apply(this.race.entries);
  }

  oddsMethodItem(entry: Entry) {
    return this.oddsMethodResults.Item(entry.postNumber.toString());
  }

  testSetup() {
    this.race.entries[0].fiveMinuteOdds = this.oddsManager.getOddsFromActual(5);
    this.race.entries[1].fiveMinuteOdds = this.oddsManager.getOddsFromActual(4);
    this.race.entries[2].fiveMinuteOdds = this.oddsManager.getOddsFromActual(6);
    this.race.entries[3].fiveMinuteOdds = this.oddsManager.getOddsFromActual(3.5);
    this.race.entries[4].fiveMinuteOdds = this.oddsManager.getOddsFromActual(2.5);
    this.race.entries[5].fiveMinuteOdds = this.oddsManager.getOddsFromActual(7);
  }

  getSaddleClothClass(postNumber: number) {
    return 'saddle-cloth-' + postNumber.toString();
  }

  resetTotalEntries(): void {
    const chopCount = this.race.entries.length - this.totalEntries;
    for (let chopIndex = 1; chopIndex <= chopCount; chopIndex++) {
      this.race.entries.splice(this.race.entries.length - 1, 1);
    }
  }

  setTrackEditMode(state: boolean) {
    this.isTrackEditMode = state;
  }

  saveTrackNotes(): void {
    this.trackService.setTrack(this.track);
    this.setTrackEditMode(false);
  }

  tickTock(): void {
    setInterval(() => {
      this.refresh();
    }, 10000);
  }

  refresh() {
    const minutesToPost: MinutesToPost = Utilities.getRaceTimeState(this.race);
    this.raceModel.minutesToPost = minutesToPost.minutesToPost;
    this.raceModel.raceTimeState = minutesToPost.raceTimeState;
    this.raceModel.timeHhmma = Utilities.getRaceTimeHhmma(this.raceModel);
    this.raceTimeHhmma = Utilities.getRaceTimeHhmma(this.race);
  }

  incrementMtp() {
    this.resetMtp(this.raceModel.minutesToPost + 2);
  }

  decrementMtp() {
    this.resetMtp(this.raceModel.minutesToPost);
  }

  private resetMtp(mtp: number): void {
    this.race.time = Utilities.getRaceTime(mtp);
    this.raceService.setRace(this.race);
    this.raceModel = new RaceModel(this.race);
    this.refresh();
  }

}
