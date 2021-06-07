import Command from '../types/CommandInterface';

const pause: Command = {
  name: 'pause',
  execute(message, player) {
    if (!player.paused) {
      player.pause();
      message.react('⏸');
    }
  },
};

export default pause;
