import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramComponent } from './program.component';
import { OddsMethod } from '../oddsMethod';
import { FormsModule } from '@angular/forms';
import { OddsManager } from '../oddsManager';

describe('ProgramComponent', () => {
  let component: ProgramComponent;
  let fixture: ComponentFixture<ProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('oddsMethod should pick favorite', async(() => {
    const oddsMethod = new OddsMethod();
    const oddsManager = new OddsManager();
    component.initEntries();
    component.incrementOdds(component.entries[0], true);
    expect(component.entries[0].fiveMinuteOdds.actual).toEqual(5);
    component.entries[0].fiveMinuteOdds = oddsManager.getOddsFromActual(5);
    component.entries[1].fiveMinuteOdds = oddsManager.getOddsFromActual(4);
    component.entries[2].fiveMinuteOdds = oddsManager.getOddsFromActual(6);
    component.entries[3].fiveMinuteOdds = oddsManager.getOddsFromActual(3.5);
    component.entries[4].fiveMinuteOdds = oddsManager.getOddsFromActual(2.5);
    component.entries[5].fiveMinuteOdds = oddsManager.getOddsFromActual(7);
    component.copyOdds();
    component.decrementOdds(component.entries[4], false);
    expect(component.entries[4].isBet).toBeTruthy();
  }));
  it('oddsMethod should pick non-fave when it goes down with fave', async(() => {
    const oddsMethod = new OddsMethod();
    const oddsManager = new OddsManager();
    component.initEntries();
    component.incrementOdds(component.entries[0], true);
    expect(component.entries[0].fiveMinuteOdds.actual).toEqual(5);
    component.entries[0].fiveMinuteOdds = oddsManager.getOddsFromActual(5);
    component.entries[1].fiveMinuteOdds = oddsManager.getOddsFromActual(4);
    component.entries[2].fiveMinuteOdds = oddsManager.getOddsFromActual(6);
    component.entries[3].fiveMinuteOdds = oddsManager.getOddsFromActual(3.5);
    component.entries[4].fiveMinuteOdds = oddsManager.getOddsFromActual(2.5);
    component.entries[5].fiveMinuteOdds = oddsManager.getOddsFromActual(7);
    component.copyOdds();
    component.decrementOdds(component.entries[4], false);
    expect(component.entries[4].isBet).toBeTruthy();
    component.decrementOdds(component.entries[2], false);
    expect(component.entries[2].isBet).toBeTruthy();
    expect(component.entries[4].isBet).toBeFalsy();
  }));
});
