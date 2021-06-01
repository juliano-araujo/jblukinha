import Command from '../CommandInterface';

const shuffle: Command = {
  name: 'shuffle',
  aliases: ['sh'],
  execute(message, queue) {
    queue.shuffle();
    message.react('🔀');
  },
};

export default shuffle;
