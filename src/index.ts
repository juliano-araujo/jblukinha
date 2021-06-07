import path from 'path';
import Discord from 'discord.js';
import glob from 'glob';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

import Queue from './classes/Queue';
import { prefix, tracksFolder } from '../settings.json';
import Command from './types/CommandInterface';
import Player from './classes/Player';

dotenv.config();

function commandLoader() {
  const files = glob.sync('./commands/@(*.js|*.ts)', { cwd: __dirname });

  const commandsArray = files.map<[string, Command]>((file) => {
    const command: Command = require(file).default;
    return [command.name, command];
  });

  const commands = new Discord.Collection<string, Command>(commandsArray);

  return commands;
}

async function readFilesInFolder(folderPath: string) {
  const dir = await fs.readdir(folderPath, { withFileTypes: true });

  const filteredFiles = dir
    .filter(
      (dirent) =>
        dirent.isFile() &&
        [
          '.mp3',
          '.m4a',
          '.ogg',
          '.opus',
          '.flac',
          '.wav',
          '.aac',
          '.wma',
        ].includes(path.extname(dirent.name))
    )
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((dirent) => path.join(folderPath, dirent.name));

  return filteredFiles;
}

async function createQueue(folderLocation?: string) {
  if (folderLocation) {
    const files = await readFilesInFolder(folderLocation);
    return new Queue(files);
  }
  return new Queue();
}

// client.user?.setActivity(getArchiveNameFromPath(queue.actualSong), {
//   type: 'LISTENING',
// });

async function start() {
  const client = new Discord.Client();

  client.once('ready', () => {
    console.log('> BOT STARTED');
  });

  const queue = await createQueue(tracksFolder);
  await client.login(process.env.DISCORD_TOKEN);
  if (!client.voice) {
    return;
  }

  const player = new Player(client.voice, queue);
  player.initBroadcast();

  const commands = commandLoader();

  client.on('message', async (message) => {
    if (
      message.author.bot ||
      (!message.content.startsWith(prefix) && message.channel.type !== 'dm') ||
      message.author.id !== process.env.DISCORD_USER_ID
    )
      return;

    const messageContent = message.content.startsWith(prefix)
      ? message.content.slice(prefix.length)
      : message.content;
    const messageContentArray = messageContent.split(/ +/);
    const commandName = messageContentArray[0].toLowerCase();
    const args = messageContentArray.slice(1);

    const command =
      commands.get(commandName) ||
      commands.find((cmd) =>
        cmd.aliases ? cmd.aliases.includes(commandName) : false
      );

    if (command) {
      try {
        const returned = command.execute(message, player, args);
        if (returned instanceof Promise) {
          await returned;
        }
      } catch (err) {
        console.error(err);
        message.reply('Algo deu errado! Fale com o administrador');
      }
    }
  });
}

start();
