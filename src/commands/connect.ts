import { ClientUser } from 'discord.js';

import Command from '../CommandInterface';

const connect: Command = {
  name: 'connect',
  aliases: ['c'],
  execute(message, player) {
    if (!message.member) {
      return message.reply(
        'Mande a mensagem de um canal de texto de um servidor em que você esteja em algum canal de voz'
      );
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('Entra em um canal  aí');
    }

    if (voiceChannel.full) {
      return message.reply('O canal está cheio');
    }

    const permissions = voiceChannel.permissionsFor(
      message.client.user as ClientUser
    );
    if (!(permissions?.has('CONNECT') && permissions?.has('SPEAK'))) {
      return message.reply(
        'O bot não tem permissão para se conectar ou reproduzir nesse canal'
      );
    }

    const { broadcast } = player;

    return voiceChannel.join().then((connection) => {
      connection.play(broadcast);
      message.react('👌');
    });
  },
};

export default connect;
