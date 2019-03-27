import * as moment from 'moment';

export class Utilities {
  public static getTodayMMDDYY(): string {
    return moment(new Date()).format('MM-DD-YY');
  }

  public static getRaceTime(minutesToPost: number): string {
    const raceTime = moment().add(minutesToPost, 'minute');
    return raceTime.format('h:mm a');
  }
}
