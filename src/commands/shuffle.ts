import Command from '../types/CommandInterface';

const shuffle: Command = {
  name: 'shuffle',
  aliases: ['sh'],
  execute(message, { queue }) {
    queue.shuffle();
    message.react('🔀');
  },
};

export default shuffle;
