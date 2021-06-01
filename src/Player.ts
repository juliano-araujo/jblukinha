import Discord from 'discord.js';

import Queue from './Queue';

class Player {
  queue: Queue;

  #playing: boolean;

  #repeat: boolean = false;

  #broadcast: Discord.VoiceBroadcast;

  constructor(clientVoice: Discord.ClientVoiceManager, queue?: Queue) {
    this.queue = queue || new Queue();
    this.#playing = false;
    this.#broadcast = clientVoice.createBroadcast();
  }

  private play(song: string) {
    const dispatcher = this.#broadcast.play(song).on('error', console.error);
    return dispatcher;
  }

  initBroadcast() {
    this.queue.on('songChanged', (actualSong) => {
      this.play(actualSong).on('finish', () => {
        if (this.#repeat) {
          this.play(this.actualSong);
        } else {
          this.next();
        }
      });
    });

    return this.#broadcast;
  }

  resume() {
    if (!this.#playing && this.#broadcast.dispatcher) {
      this.#broadcast.dispatcher.resume();
      this.#playing = true;
    }
  }

  pause() {
    if (this.#playing && this.#broadcast.dispatcher) {
      this.#broadcast.dispatcher.pause();
      this.#playing = false;
    }
  }

  repeat(repeat?: boolean) {
    this.#repeat = repeat ?? !this.#repeat;
  }

  previous() {
    this.queue.previous();
  }

  next() {
    this.queue.next();
  }

  jump(songNumber: number) {
    this.queue.jump(songNumber);
  }

  get actualSong() {
    return this.queue.actualSong;
  }

  get paused() {
    return !this.#playing;
  }

  get broadcast() {
    return this.#broadcast;
  }
}

export default Player;
