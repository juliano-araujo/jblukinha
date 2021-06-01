import Command from '../CommandInterface';

const quit: Command = {
  name: 'quit',
  aliases: ['q', 'kill'],
  async execute(message, player) {
    const { client } = message;

    player.broadcast.end();
    client.voice?.connections.forEach((connection) => connection.disconnect());

    const reaction = message.react('🚪');
    const presence = client.user?.setStatus('invisible');
    await Promise.all([reaction, presence]);

    process.exit();
  },
};

export default quit;
