import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-delete-race-modal',
  templateUrl: './delete-race-modal.component.html',
  styleUrls: ['./delete-race-modal.component.css']
})
export class DeleteRaceModalComponent implements OnInit {
  display: string;
  isOpen = false;

  @Input() raceToDelete: Race;
  @Output() raceDeleted = new EventEmitter();

  constructor(
    private raceService: RaceService,
  ) {}

  ngOnInit() {
    this.display = 'none';
  }

  deleteRace(): void {
    this.raceService.deleteRace(this.raceToDelete.track, this.raceToDelete.date, this.raceToDelete.number);
    this.raceDeleted.emit({ race: this.raceToDelete });
    this.onCloseHandled();
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
