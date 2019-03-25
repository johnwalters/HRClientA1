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
    const self = this;
    this.items = _.sortBy(this.items, function(item: OddsMethodItem) {
      if (!item.entry.fiveMinuteOdds) return '999.99';
      if (!item.entry.fiveMinuteOdds.actual) return '999.99';
      // tslint:disable-next-line:max-line-length
      const sortable = item.entry.fiveMinuteOdds.actual.toLocaleString('en', {minimumIntegerDigits: 5, minimumFractionDigits: 2, useGrouping: false});
      return sortable;
    });
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
      if (item.entry.fiveMinuteOdds && item.entry.oneMinuteOdds) {
      if (item.entry.fiveMinuteOdds.actual > item.entry.oneMinuteOdds.actual) {
        item.wentDown = true;
        item.wentUp = false;
      }
      if (item.entry.fiveMinuteOdds.actual < item.entry.oneMinuteOdds.actual) {
        item.wentDown = false;
        item.wentUp = true;
      }
    }
      top6Index = top6Index + 1;
      if (top6Index > 6) break;
    }
    if (!bettingFavorite.wentUp) {
      for (const item of this.items) {
        if (!item.isTopSix) continue;
        if (item.wentDown) {
          item.isBet = true;
          item.entry.isBet = true;
          if (!item.isFavorite) {
            nonBettingFavoriteWentDown = true;
          }
        }
      }
      if (nonBettingFavoriteWentDown === false) {
        // favorite is the bet
        bettingFavorite.isBet = true;
        bettingFavorite.entry.isBet = true;
      } else {
          // favorite is not the bet
          bettingFavorite.isBet = false;
          bettingFavorite.entry.isBet = false;
      }
    }

    this.indexedItems = new KeyedCollection<OddsMethodItem>();
    for (const item of this.items) {
      this.indexedItems.Add(item.entry.postNumber.toString(), item);
    }

    return this.indexedItems;
  }

   sortableOdds( odds: number ) {
    const sortable = odds.toLocaleString('en', {minimumIntegerDigits: 5, minimumFractionDigits: 2, useGrouping: false});
    // console.log('sortable: ' + odds + ' - ' + sortable);
    // return sortable;
  }

// sortableOdds( odds:number, width:number )
// {
//   width -= odds.toString().length;
//   if ( width > 0 )
//   {
//     return new Array( width + (/\./.test( odds ) ? 2 : 1) ).join( '0' ) + odds;
//   }
//   return odds + ''; // always return a string
// }
}


