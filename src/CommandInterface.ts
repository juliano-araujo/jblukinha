import { Message } from 'discord.js';
import Player from './Player';

interface Command {
  name: string;
  aliases?: string[];
  execute(
    message: Message,
    player: Player,
    args?: string[]
  ): Promise<any> | void;
}

export default Command;
