import { Message, MessageEmbed } from 'discord.js';

import Command from '../CommandInterface';
import getArchiveNameFromPath from '../utils/getArchiveNameFromPath';

const search: Command = {
  name: 'search',
  aliases: ['s'],
  async execute(message, { queue }, args) {
    if (!args || args?.length === 0) {
      return message.reply('Adicione algo para eu pesquisar');
    }

    const searchString = args.join(' ');
    const results = queue.search(searchString, { limit: 5 });

    if (!results.length) {
      return message.channel.send('Não encontrei resultados para sua busca');
    }

    const formattedResults = results.map(
      (result, index) =>
        `  ${index + 1}) ${getArchiveNameFromPath(result.item)}`
    );

    const sentMessage = await message.channel.send(formattedResults, {
      code: 'nim',
    });
    const filter = (collected: Message) => {
      const responseNumber = parseInt(collected.content, 10);
      return (
        !Number.isNaN(responseNumber) &&
        responseNumber > 0 &&
        responseNumber <= results.length &&
        collected.author.id === message.author.id
      );
    };

    const { channel } = message;
    const collectedMessages = await channel.awaitMessages(filter, {
      max: 1,
      time: 10000,
    });
    const option = collectedMessages.first();
    if (option) {
      const optionNumber = parseInt(option.content, 10);
      const selectedResult = results[optionNumber - 1];
      queue.jump(selectedResult.refIndex);
      const embed = new MessageEmbed()
        .setTitle('Agora Tocando:')
        .setDescription(getArchiveNameFromPath(selectedResult.item));
      return channel.send(embed);
    }
    return sentMessage.delete();
  },
};

export default search;
