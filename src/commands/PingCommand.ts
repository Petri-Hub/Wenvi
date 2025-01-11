import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'

export class PingCommand implements IExecutableCommand {
   public async execute(): Promise<void> {
      Logger.log('Pong!')
   }
}
