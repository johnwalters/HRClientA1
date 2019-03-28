import { Entry } from './entry';

export class Race {
  public track: string;
  public date: string;
  public number: number;
  public time: string;
  public entries: Entry[];
}

export enum RaceTimeState {
  closeToFiveMin = 'closeToFiveMin',
  veryCloseToFiveMin = 'veryCloseToFiveMin',
  afterFiveMinUnset = 'afterFiveMinUnset',
  closeToOneMin = 'closeToOneMin',
  veryCloseToOneMin = 'veryCloseToOneMin',
  ok = 'ok',
  off = 'off'
}
