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
    const increment = oddsManager.increment('5/2');
    expect(increment.actual).toEqual(3);
    expect(increment.displayed).toEqual('3');
  }));
  it('oddsManager should decrement 9/2 to 4', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const four = oddsManager.decrement('9/2');
    expect(four.actual).toEqual(4);
  }));
  it('oddsManager should increment 9/2 to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const incremented = oddsManager.increment('9/2');
    expect(incremented.actual).toEqual(5);
  }));
  it('oddsManager should increment 4 to 7/2', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('4');
    expect(decremented.actual).toEqual(3.5);
    expect(decremented.displayed).toEqual('7/2');
  }));
  it('oddsManager should not decrement 1/5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('1/5');
    expect(decremented.actual).toEqual(.2);
  }));
  it('oddsManager should decrement 6 to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('6');
    expect(decremented.actual).toEqual(5);
  }));
  it('oddsManager should decrement 26 to 25', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('26');
    expect(decremented.actual).toEqual(25);
  }));
  it('oddsManager should return NaN for a bad input', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const actual = oddsManager.getActual('testBadNumber');
    expect(actual).toBeNaN();
  }));
  it('oddsManager should increment blank to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const incremented = oddsManager.increment('');
    expect(incremented.actual).toEqual(5);
    expect(incremented.displayed).toEqual('5');
  }));
  it('oddsManager should increment null to 5', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const incremented = oddsManager.increment(null);
    expect(incremented.actual).toEqual(5);
    expect(incremented.displayed).toEqual('5');
  }));
  it('oddsManager should decrement blank to 2', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement('');
    expect(decremented.actual).toEqual(2);
    expect(decremented.displayed).toEqual('2');
  }));
  it('oddsManager should decrement null to 2', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const decremented = oddsManager.decrement(null);
    expect(decremented.actual).toEqual(2);
    expect(decremented.displayed).toEqual('2');
  }));
  it('oddsManager should return odds of 2/5 for actual .4', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oddsManager = new OddsManager();
    const odds = oddsManager.getOddsFromActual(.4);
    expect(odds).toBeTruthy();
    expect(odds.displayed).toEqual('2/5');
  }));
});
