import { Entry } from './entry';

export class Race {
  public track: string;
  public date: string;
  public number: number;
  public time: string;
  public raceTimeState: RaceTimeState; // TODO: should be in a model
  public minutesToPost: number; // TODO: should be in a model
  public entries: Entry[];
}

export enum RaceTimeState {
  closeToFiveMin = 'closeToFiveMin',
  veryCloseToFiveMin = 'veryCloseToFiveMin',
  afterFiveMinUnset = 'afterFiveMinUnset',
  closeToOneMin = 'closeToOneMin',
  veryCloseToOneMin = 'veryCloseToOneMin',
  ok = 'ok'
}
