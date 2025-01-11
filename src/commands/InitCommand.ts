import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'
import { BaseCommand } from './BaseCommand'

export class InitCommand extends BaseCommand implements IExecutableCommand {
   public async execute(): Promise<void> {
      const repository = this.getRepository()

      await repository.init()

      Logger.success('Repository created successfully.')
   }
}
