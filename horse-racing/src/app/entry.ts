import { Odds } from './odds';

export class Entry {
  public countryCode: string;
  public trackCode: string;
  public raceDate: Date;
  public postTime: string;
  public postNumber: number;
  public postPosition: number;
  public horseName: string;
  public ageSex: string;
  public meds: string;
  public jockey: string;
  public weight: string;
  public trainerName: string;
  public isTrainerGood: boolean;
  public morningLineOdds: Odds;
  public fiveMinuteOdds: Odds;
  public oneMinuteOdds: Odds;
  public liveOdds: Odds;
  public finalOdds: Odds;
  public isScratched: boolean;
  public isBet: boolean;

  public constructor(postNumber: number) {
    this.postNumber = postNumber;
    this.morningLineOdds = new Odds();
    this.fiveMinuteOdds = new Odds();
    this.oneMinuteOdds = new Odds();
    this.liveOdds = new Odds();
    this.finalOdds = new Odds();
  }
}
