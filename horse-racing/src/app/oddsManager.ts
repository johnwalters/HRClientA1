import { KeyedCollection } from './keyedCollection';
import { Odds } from './odds';

export class OddsManager {

  // TODO: handle odds of below 1/5 (1/9 etc.)
  private actuals: KeyedCollection<number>;
  private displayed: KeyedCollection<string>;
  private displayedOrdered: Array<string>;
  private floor = Math.floor;

  public constructor() {
    this.initActuals();
    this.initDisplayed();
  }

  public getActual(displayed: string) {
    const treatedDisplayed = displayed.trim();
    if (this.actuals.ContainsKey(treatedDisplayed)) {
      return this.actuals.Item(treatedDisplayed);
    } else {
      return this.floor(parseFloat(treatedDisplayed));
    }
  }

  public getOddsFromActual(actual: number): Odds {
    const displayedValue = this.displayed.Item(actual.toString());
    if (displayedValue) {
      const odds = new Odds();
      odds.actual = actual;
      odds.displayed = displayedValue;
      return odds;
    } else {
      const odds = new Odds();
      odds.actual = actual;
      odds.displayed = actual.toString();
      return odds;
    }
    return null;
  }

  public increment(displayed: string): Odds {
    const resultingOdds = new Odds();
    if (!displayed) {
      displayed = '';
    }
    const treatedDisplayed = displayed.trim();
    if (treatedDisplayed === '' || !treatedDisplayed) {
      resultingOdds.actual = 5;
      resultingOdds.displayed = resultingOdds.actual.toString();
      return resultingOdds;
    }
    if (this.actuals.ContainsKey(treatedDisplayed)) {
      if (treatedDisplayed === '9/2') {
        resultingOdds.actual = 5;
        resultingOdds.displayed = resultingOdds.actual.toString();
        return resultingOdds;
      }
      for (let keyIndex = 0; keyIndex <= this.displayedOrdered.length; keyIndex++) {
        if (treatedDisplayed === this.displayedOrdered[keyIndex]) {
          const nextKey = this.displayedOrdered[keyIndex + 1];
          resultingOdds.actual = this.actuals.Item(nextKey);
          resultingOdds.displayed = nextKey;
          return resultingOdds;
        }
      }
    } else {
      const actual = this.floor(parseFloat(treatedDisplayed));
      resultingOdds.actual = actual + 1;
      resultingOdds.displayed = resultingOdds.actual.toString();
      return resultingOdds;
    }
  }

  public decrement(displayed: string): Odds {
    const resultingOdds = new Odds();
    if (!displayed) {
      displayed = '';
    }
    const treatedDisplayed = displayed.trim();
    if (treatedDisplayed === '' || !treatedDisplayed) {
      resultingOdds.actual = 2;
      resultingOdds.displayed = resultingOdds.actual.toString();
      return resultingOdds;
    }
    if (this.actuals.ContainsKey(treatedDisplayed)) {
      if (treatedDisplayed === '1/5') {
        resultingOdds.actual = .2;
        resultingOdds.displayed = '1/5';
        return resultingOdds;
      }
      for (let keyIndex = 0; keyIndex <= this.displayedOrdered.length; keyIndex++) {
        if (treatedDisplayed === this.displayedOrdered[keyIndex]) {
          const nextKey = this.displayedOrdered[keyIndex - 1];
          resultingOdds.actual = this.actuals.Item(nextKey);
          resultingOdds.displayed = nextKey;
          return resultingOdds;
        }
      }
    } else {
      const actual = this.floor(parseFloat(treatedDisplayed));
      resultingOdds.actual = actual - 1;
      resultingOdds.displayed = resultingOdds.actual.toString();
      return resultingOdds;
    }
  }

  private initActuals() {
    this.actuals = new KeyedCollection<number>();
    this.actuals.Add('1/5', .2);
    this.actuals.Add('2/5', .4);
    this.actuals.Add('3/5', .6);
    this.actuals.Add('4/5', .8);
    this.actuals.Add('1', 1);
    this.actuals.Add('6/5', 1.2);
    this.actuals.Add('7/5', 1.4);
    this.actuals.Add('3/2', 1.5);
    this.actuals.Add('8/5', 1.6);
    this.actuals.Add('9/5', 1.8);
    this.actuals.Add('2', 2);
    this.actuals.Add('5/2', 2.5);
    this.actuals.Add('3', 3);
    this.actuals.Add('7/2', 3.5);
    this.actuals.Add('4', 4);
    this.actuals.Add('9/2', 4.5);

    this.displayed = new KeyedCollection<string>();
    this.displayed.Add(.2.toString(), '1/5');
    this.displayed.Add(.4.toString(), '2/5');
    this.displayed.Add(.6.toString(), '3/5');
    this.displayed.Add( .8.toString(), '4/5');
    this.displayed.Add( 1.0.toString(), '1');
    this.displayed.Add( 1.2.toString(), '6/5');
    this.displayed.Add( 1.4.toString(), '7/5');
    this.displayed.Add( 1.5.toString(), '3/2');
    this.displayed.Add( 1.6.toString(), '8/5');
    this.displayed.Add( 1.8.toString(), '9/5');
    this.displayed.Add( 2.0.toString(), '2');
    this.displayed.Add( 2.5.toString(), '5/2');
    this.displayed.Add(3.0.toString(), '3');
    this.displayed.Add( 3.5.toString(), '7/2');
    this.displayed.Add( 4.0.toString(), '4');
    this.displayed.Add( 4.5.toString(), '9/2');
  }

  private initDisplayed() {
    this.displayedOrdered = new Array<string>();
    this.displayedOrdered.push('1/5');
    this.displayedOrdered.push('2/5');
    this.displayedOrdered.push('3/5');
    this.displayedOrdered.push('4/5');
    this.displayedOrdered.push('1');
    this.displayedOrdered.push('6/5');
    this.displayedOrdered.push('7/5');
    this.displayedOrdered.push('3/2');
    this.displayedOrdered.push('8/5');
    this.displayedOrdered.push('9/5');
    this.displayedOrdered.push('2');
    this.displayedOrdered.push('5/2');
    this.displayedOrdered.push('3');
    this.displayedOrdered.push('7/2');
    this.displayedOrdered.push('4');
    this.displayedOrdered.push('9/2');
  }
}
