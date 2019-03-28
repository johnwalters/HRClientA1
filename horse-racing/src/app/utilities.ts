import * as moment from 'moment';
import { RaceTimeState, Race } from './race';
import { MinutesToPost } from './MinutesToPost';

export class Utilities {
  public static getTodayMMDDYY(): string {
    return moment(new Date()).format('MM-DD-YY');
  }

  public static getRaceTime(minutesToPost: number): string {
    const raceTime = moment().add(minutesToPost, 'minute');
    return raceTime.format('HH:mm');
  }

  public static getNowHHMMa(): string {
    return moment(new Date()).format('h:mm a');
  }
  public static getNowHHMMSSa(): string {
    return moment(new Date()).format('h:mm:ss a');
  }

  public static getRaceTimeState(race: Race): MinutesToPost {
    // const isDebug = false;
    const result = new MinutesToPost();
    const raceTime = moment(race.date + ' ' + race.time, 'MM-DD-YYYY hh:mm');
    // Utilities.log('raceTime (from ' + race.date + ' ' + race.time + '):' + raceTime, isDebug);
    result.minutesToPost = raceTime.diff(moment(new Date()), 'minutes');
    result.raceTimeState =  RaceTimeState.ok;
    if (result.minutesToPost <= -5) {
      result.raceTimeState =  RaceTimeState.off;
      return result;
    }
    if (result.minutesToPost <= 2) {
      result.raceTimeState =  RaceTimeState.veryCloseToOneMin;
      return result;
    }
    if (result.minutesToPost <= 3) {
      result.raceTimeState =  RaceTimeState.closeToOneMin;
      return result;
    }
    if (result.minutesToPost <= 6) {
      result.raceTimeState =  RaceTimeState.veryCloseToFiveMin;
      return result;
    }
    if (result.minutesToPost <= 7) {
      result.raceTimeState =  RaceTimeState.closeToFiveMin;
      return result;
    }
    return result;
  }

  public static getMinutesToPost(race: Race): number {
    const raceTime = moment(race.date + ' ' + race.time);
    const minutesToPost = raceTime.diff(moment(new Date()), 'minutes');
    return minutesToPost;
  }

  public static log(message: string, isDebug: boolean): void {
    if (!isDebug)return;
    console.log(message);
  }
}

