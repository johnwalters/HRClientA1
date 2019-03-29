import { Injectable } from '@angular/core';
import { KeyedCollection } from './keyedCollection';
import { Track } from './track';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  _keyedTracks: KeyedCollection<Track>;

  private get keyedTracks(): KeyedCollection<Track> {
    if (!this._keyedTracks) {
      this._keyedTracks = new KeyedCollection<Track>();
      let tracks: Array<Track> = this.localStorageService.readObject<Array<Track>>('hr_tracks');
      if (!tracks) {
        tracks = new Array<Track>();
      }
      for (const track of tracks) {
        this.setTrack(track);
      }
    }
   return this._keyedTracks;
  }

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  getTrack(trackCode: string): Track {
    const existingTrack =  this.keyedTracks.Item(trackCode);
    if (existingTrack) return existingTrack;
    const newTrack = new Track();
    newTrack.trackCode = trackCode;
    this.setTrack(newTrack);
    return newTrack;
  }

  setTrack(track: Track) {
    this.keyedTracks.Add(track.trackCode, track);
    this.saveTracks();
  }

  private saveTracks() {
    this.localStorageService.writeObject('hr_tracks', this._keyedTracks.Values());
  }


}
