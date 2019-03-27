import * as moment from 'moment';
import { RaceTimeState, Race } from './race';
import { MinutesToPost } from './MinutesToPost';

export class Utilities {
  public static getTodayMMDDYY(): string {
    return moment(new Date()).format('MM-DD-YY');
  }

  public static getRaceTime(minutesToPost: number): string {
    const raceTime = moment().add(minutesToPost, 'minute');
    return raceTime.format('h:mm a');
  }

  public static getNowHHMMa(): string {
    return moment(new Date()).format('h:mm a');
  }
  public static getNowHHMMSSa(): string {
    return moment(new Date()).format('h:mm:ss a');
  }

  public static getRaceTimeState(race: Race): MinutesToPost {
    const result = new MinutesToPost();
    const raceTime = moment(race.date + ' ' + race.time);
    result.minutesToPost = raceTime.diff(moment(new Date()), 'minutes');
    // TODO: determine race time state
    result.raceTimeState =  RaceTimeState.ok;
    return result;
  }

  public static getMinutesToPost(race: Race): number {
    const raceTime = moment(race.date + ' ' + race.time);
    const minutesToPost = raceTime.diff(moment(new Date()), 'minutes');
    return minutesToPost;
  }
}

