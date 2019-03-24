import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { OddsManager } from '../oddsManager';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  entries: Entry[];
  oddsManager: OddsManager;

  constructor() { }

  ngOnInit() {
    this.initEntries();
    this.oddsManager = new OddsManager();
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
    }
  }

  decrementOdds(entry: Entry, isFiveMinute: boolean) {
    if (isFiveMinute) {
      entry.fiveMinuteOdds = this.oddsManager.decrement(entry.fiveMinuteOdds.displayed);
    } else {
      entry.oneMinuteOdds = this.oddsManager.decrement(entry.oneMinuteOdds.displayed);
    }
  }

  copyOdds() {
    for (const odds of this.entries) {
      odds.oneMinuteOdds = odds.fiveMinuteOdds;
    }
  }

}
