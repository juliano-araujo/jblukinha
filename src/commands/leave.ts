import Command from '../CommandInterface';

const leave: Command = {
  name: 'leave',
  execute(message) {
    const { member } = message;
    if (!member) {
      return message.reply('Mande a mensagem a partir de algum servidor');
    }

    const { guild } = member;

    const channel = guild.voice?.channel;
    if (!channel) {
      return message.reply(
        'Não estou conectado em nenhum canal nesse servidor'
      );
    }

    channel.leave();
    return message.react('👋');
  },
};

export default leave;
