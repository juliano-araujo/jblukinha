import Command from '../CommandInterface';

const resume: Command = {
  name: 'resume',
  aliases: ['play'],
  execute(message, player) {
    if (player.paused) {
      player.resume();
      message.react('▶');
    }
  },
};

export default resume;
