import Command from '../types/CommandInterface';

const next: Command = {
  name: 'next',
  aliases: ['skip'],
  execute(message, player) {
    player.next();
    message.react('⏭');
  },
};

export default next;
