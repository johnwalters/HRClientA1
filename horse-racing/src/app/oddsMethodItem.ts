import { Entry } from './entry';
export class OddsMethodItem {
  public isFavorite: boolean;
  public isTopSix: boolean;
  public wentDown: boolean;
  public wentUp: boolean;
  public isBet: boolean;
  public entry: Entry;
  public constructor(entry: Entry) {
    this.entry = entry;
  }
}
