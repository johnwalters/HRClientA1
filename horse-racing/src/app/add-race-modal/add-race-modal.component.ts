import { Component, OnInit } from '@angular/core';
import { Utilities } from '../utilities';
import { RaceService } from '../race.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-race-modal',
  templateUrl: './add-race-modal.component.html',
  styleUrls: ['./add-race-modal.component.css']
})
export class AddRaceModalComponent implements OnInit {

  display: string;
  isOpen = false;
  track: string;
  date: string;
  number: number;

  constructor(
    private raceService: RaceService,
    private router: Router
    ) {}

  ngOnInit() {
    this.display = 'none';
    this.date = Utilities.getTodayMMDDYY();
  }

  addRace() {
    const race = RaceService.createRace(this.track, this.date, this.number);
    this.raceService.setRace(race);
    this.onCloseHandled();
    // go there
    this.router.navigate(['/race', this.track, this.date, this.number]);
  }

  openModal() {
    this.isOpen = true;
    this.display = 'block';
  }

  onCloseHandled() {
    this.isOpen = false;
    this.display = 'none';
  }

}
