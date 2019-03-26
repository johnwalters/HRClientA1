import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaceModalComponent } from './add-race-modal.component';

describe('AddRaceModalComponent', () => {
  let component: AddRaceModalComponent;
  let fixture: ComponentFixture<AddRaceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRaceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
