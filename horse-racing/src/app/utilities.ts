import * as moment from 'moment';

export class Utilities {
  public static getTodayMMDDYY(): string {
    return moment(new Date()).format('MM-DD-YY');
  }
}
