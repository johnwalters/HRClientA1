import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRaceModalComponent } from './delete-race-modal.component';

describe('DeleteRaceModalComponent', () => {
  let component: DeleteRaceModalComponent;
  let fixture: ComponentFixture<DeleteRaceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRaceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
