import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  entries: Entry[];
  constructor() { }

  ngOnInit() {
    this.initEntries();
  }

  initEntries() {
    this.entries = new Array<Entry>();
    for (let i = 1; i < 13 ; i++) {
      this.entries.push(new Entry(i));
    }
  }

}
