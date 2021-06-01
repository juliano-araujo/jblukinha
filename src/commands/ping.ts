import Command from '../CommandInterface';

const ping: Command = {
  name: 'ping',
  execute(message) {
    message.channel.send('Ping...').then((sent) => {
      sent.edit(`Pong!! ${sent.createdTimestamp - message.createdTimestamp}ms`);
    });
  },
};

export default ping;
