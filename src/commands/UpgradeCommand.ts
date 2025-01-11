import { IExecutableCommand } from '../interfaces/ICommand'
import { execSync } from 'child_process'
import { Logger } from '../logging/Logger'
import { WenviUpgradeError } from '../errors/WenviUpgradeError'

export class UpgradeCommand implements IExecutableCommand {
   public async execute(): Promise<void> {
      try {
         execSync('npm install -g wenvi')
         Logger.success('Upgrade applied sucessfully!')
      } catch (error) {
         throw new WenviUpgradeError(error)
      }
   }
}
