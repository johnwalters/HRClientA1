import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramComponent } from './program.component';
import { OddsMethod } from '../oddsMethod';
import { FormsModule } from '@angular/forms';

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
    component.initEntries();
    component.incrementOdds(component.entries[0], true);
    expect(component.entries[0].fiveMinuteOdds.actual).toEqual(5);
  }));
});
