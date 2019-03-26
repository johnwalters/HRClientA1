import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { OddsManager } from '../oddsManager';
import { OddsMethod } from '../oddsMethod';
import { KeyedCollection } from '../keyedCollection';
import { OddsMethodItem } from '../oddsMethodItem';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  race: Race;
  // entries: Entry[];
  oddsManager: OddsManager;
  oddsMethod: OddsMethod;
  oddsMethodResults: KeyedCollection<OddsMethodItem>;
  private parameterSubscription: any;

  constructor(
    private raceService: RaceService,
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
  }

  incrementOdds(entry: Entry, isFiveMinute: boolean) {
    // if (!entry.fiveMinuteOdds || !entry.fiveMinuteOdds.displayed) return;
    if (isFiveMinute) {
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

}
