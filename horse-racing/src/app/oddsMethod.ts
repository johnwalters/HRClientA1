import { Entry } from './entry';
import * as _ from 'underscore';
import { OddsMethodItem } from './oddsMethodItem';
import { KeyedCollection } from './keyedCollection';

export class OddsMethod {
  // grab the odds of the top 6 betting favorites at 5 minutes to post
  // note the favorite
  // grab the odds of those choices at 1 minutes to post
  // if the odds on the favorite goes up, all bets are off
  // if the favorite goes down in odds and none of the others goes down, bet the favorite
  // if the favorite goes down in odds and another goes down with it, bet that higher odds horse
  // if the favorite's odds stay the same another goes down , bet that non-favorite
  private items: OddsMethodItem[];
  private indexedItems: KeyedCollection<OddsMethodItem>;

  public apply(entries: Entry[]): KeyedCollection<OddsMethodItem> {
    // initialize items
    this.items = new Array<OddsMethodItem>();
    for (const entry of entries) {
      this.items.push(new OddsMethodItem(entry));
    }
    // sort, note top 6
    // TODO: need sortable odds (zero padded)
    this.items = _.sortBy(this.items, function(item: OddsMethodItem) { return item.entry.fiveMinuteOdds.displayed; });
    let top6Index = 1;
    let isFavoriteNoted = false;
    let nonBettingFavoriteWentDown = false;
    let bettingFavorite: OddsMethodItem = null;
    for (const item of this.items) {
      item.isTopSix = true;
      if (!isFavoriteNoted) {
        bettingFavorite = item;
        item.isFavorite = true;
        isFavoriteNoted = true;
      }
      if (item.entry.fiveMinuteOdds.actual > item.entry.oneMinuteOdds.actual) {
        item.wentDown = true;
        item.wentUp = false;
      }
      if (item.entry.fiveMinuteOdds.actual < item.entry.oneMinuteOdds.actual) {
        item.wentDown = false;
        item.wentUp = true;
      }
      top6Index = top6Index + 1;
      if (top6Index > 6) break;
    }
    if (!bettingFavorite.wentUp) {
      for (const item of this.items) {
        if (!item.isTopSix) continue;
        if (item.wentDown) {
          item.isBet = true;
          nonBettingFavoriteWentDown = true;
        }
      }
      if (nonBettingFavoriteWentDown === false) {
        // favorite is the bet
        bettingFavorite.isBet = true;
      }
    }

    this.indexedItems = new KeyedCollection<OddsMethodItem>();
    for (const item of this.items) {
      this.indexedItems.Add(item.entry.postNumber.toString(), item);
    }

    return this.indexedItems;
  }
}


