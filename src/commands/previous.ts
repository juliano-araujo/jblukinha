import Command from '../types/CommandInterface';

const previous: Command = {
  name: 'previous',
  aliases: ['back'],
  execute(message, player) {
    player.previous();
    message.react('⏮');
  },
};

export default previous;
