import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { OddsManager } from '../oddsManager';
import { OddsMethod } from '../oddsMethod';
import { KeyedCollection } from '../keyedCollection';
import { OddsMethodItem } from '../oddsMethodItem';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  entries: Entry[];
  oddsManager: OddsManager;
  oddsMethod: OddsMethod;
  oddsMethodResults: KeyedCollection<OddsMethodItem>;

  constructor() { }

  ngOnInit() {
    this.initEntries();
    this.oddsManager = new OddsManager();
    this.oddsMethod = new OddsMethod();
    this.oddsMethodResults = new KeyedCollection<OddsMethodItem>();
  }

  initEntries() {
    this.entries = new Array<Entry>();
    for (let i = 1; i < 13 ; i++) {
      this.entries.push(new Entry(i));
    }
  }

  toggleTrainer(entry: Entry) {
    entry.isTrainerGood = !entry.isTrainerGood;
  }

  incrementOdds(entry: Entry, isFiveMinute: boolean) {
    if (isFiveMinute) {
      entry.fiveMinuteOdds = this.oddsManager.increment(entry.fiveMinuteOdds.displayed);
    } else {
      entry.oneMinuteOdds = this.oddsManager.increment(entry.oneMinuteOdds.displayed);
      this.callOddsMethod();
    }
  }

  decrementOdds(entry: Entry, isFiveMinute: boolean) {
    if (isFiveMinute) {
      entry.fiveMinuteOdds = this.oddsManager.decrement(entry.fiveMinuteOdds.displayed);
    } else {
      entry.oneMinuteOdds = this.oddsManager.decrement(entry.oneMinuteOdds.displayed);
      this.callOddsMethod();
    }
  }

  copyOdds() {
    for (const odds of this.entries) {
      odds.oneMinuteOdds = odds.fiveMinuteOdds;
    }
  }

  callOddsMethod() {
    this.oddsMethodResults = this.oddsMethod.apply(this.entries);
  }

  oddsMethodItem(entry: Entry) {
    return this.oddsMethodResults.Item(entry.postNumber.toString());
  }

}
