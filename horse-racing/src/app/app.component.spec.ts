import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OddsManager } from './oddsManager';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('oddsManager should give actual for 5/2', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const fiveToTwo = oddsManager.getActual('5/2');
    expect(fiveToTwo).toEqual(2.5);
  }));
  it('oddsManager should increment 5/2 to 3', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const three = oddsManager.increment('5/2');
    expect(three).toEqual(3);
  }));
  it('oddsManager should decrement 9/2 to 4', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const four = oddsManager.decrement('9/2');
    expect(four).toEqual(4);
  }));
  it('oddsManager should increment 9/2 to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const incremented = oddsManager.increment('9/2');
    expect(incremented).toEqual(5);
  }));
  it('oddsManager should not decrement 1/5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('1/5');
    expect(decremented).toEqual(.2);
  }));
  it('oddsManager should decrement 6 to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('6');
    expect(decremented).toEqual(5);
  }));
  it('oddsManager should decrement 26 to 25', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('26');
    expect(decremented).toEqual(25);
  }));
  it('oddsManager should return NaN for a bad input', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const actual = oddsManager.getActual('testBadNumber');
    expect(actual).toBeNaN();
  }));
});
