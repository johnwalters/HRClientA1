import { KeyedCollection } from './keyedCollection';

export class OddsManager {

  private actuals: KeyedCollection<number>;
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

  public increment(displayed: string): number {
    const treatedDisplayed = displayed.trim();
    if (this.actuals.ContainsKey(treatedDisplayed)) {
      if (treatedDisplayed === '9/2') {
          return 5;
      }
      for (let keyIndex = 0; keyIndex <= this.displayedOrdered.length; keyIndex++) {
        if (treatedDisplayed === this.displayedOrdered[keyIndex]) {
          const nextKey = this.displayedOrdered[keyIndex + 1];
          return this.actuals.Item(nextKey);
        }
      }
    } else {
      const actual = this.floor(parseFloat(treatedDisplayed));
      return actual + 1;
    }
  }

  public decrement(displayed: string): number {
    const treatedDisplayed = displayed.trim();
    if (this.actuals.ContainsKey(treatedDisplayed)) {
      if (treatedDisplayed === '1/5') {
          return .2;
      }
      for (let keyIndex = 0; keyIndex <= this.displayedOrdered.length; keyIndex++) {
        if (treatedDisplayed === this.displayedOrdered[keyIndex]) {
          const nextKey = this.displayedOrdered[keyIndex - 1];
          return this.actuals.Item(nextKey);
        }
      }
    } else {
      const actual = this.floor(parseFloat(treatedDisplayed));
      return actual - 1;
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
    this.actuals.Add('8/5', 1.6);
    this.actuals.Add('9/5', 1.8);
    this.actuals.Add('2', 2);
    this.actuals.Add('5/2', 2.5);
    this.actuals.Add('3', 3);
    this.actuals.Add('7/2', 3.5);
    this.actuals.Add('4', 4);
    this.actuals.Add('9/2', 4.5);
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
