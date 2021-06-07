import { EventEmitter } from 'events';
import Fuse from 'fuse.js';

import shuffleArray from '../utils/shuffleArray';

interface eventListeners {
  songChanged: (actualSong: string) => void;
}

class Queue extends EventEmitter {
  #songs: string[];

  #actualSongNumber: number;

  #fuse: Fuse<string>;

  constructor(songs: string[] = []) {
    super();

    this.#songs = songs;
    this.#actualSongNumber = -1;
    this.#fuse = new Fuse(songs, { includeScore: true });
  }

  previous() {
    if (this.#actualSongNumber <= -1) {
      this.#actualSongNumber = this.#songs.length - 1;
    } else {
      this.#actualSongNumber -= 1;
    }
    super.emit('songChanged', this.actualSong);
  }

  next() {
    if (this.#actualSongNumber >= this.#songs.length - 1) {
      this.#actualSongNumber = -1;
    } else {
      this.#actualSongNumber += 1;
    }
    super.emit('songChanged', this.actualSong);
  }

  jump(songNumber: number) {
    if (songNumber >= this.#songs.length || songNumber < 0) {
      this.#actualSongNumber = -1;
    }
    this.#actualSongNumber = songNumber;
    super.emit('songChanged', this.actualSong);
  }

  search(searchString: string, options: Fuse.FuseSearchOptions) {
    const results = this.#fuse.search(searchString, options);

    return results;
  }

  shuffle() {
    this.songs = shuffleArray(this.#songs);
  }

  on<T extends keyof eventListeners>(event: T, listener: eventListeners[T]) {
    return super.on(event, listener);
  }

  get actualSong() {
    if (this.#actualSongNumber === -1 || this.#songs.length === 0) {
      return '';
    }
    return this.#songs[this.#actualSongNumber];
  }

  get songs() {
    return this.#songs;
  }

  set songs(songs) {
    this.#songs = songs;
    this.#actualSongNumber = -1;
    this.#fuse.setCollection(songs);
    super.emit('songChanged', this.actualSong);
  }
}

export default Queue;
