import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceServiceTestsComponent } from './race-service-tests.component';

describe('RaceServiceTestsComponent', () => {
  let component: RaceServiceTestsComponent;
  let fixture: ComponentFixture<RaceServiceTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceServiceTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceServiceTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
