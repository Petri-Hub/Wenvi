import chalk from 'chalk'
import clipboard from 'clipboardy'
import { EnvironmentNotSpecifiedError } from '../errors/EnvironmentNotSpecifiedError'
import { SubjectNotSpecifiedError } from '../errors/SubjectNotSpecifiedError'
import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'
import { CommandInput } from '../types/CommandInput'
import { BaseCommand } from './BaseCommand'

export class CopyCommand extends BaseCommand implements IExecutableCommand {
   public async execute({
      parameters: [subjectName, environmentName]
   }: CommandInput): Promise<void> {
      if (!subjectName) {
         throw new SubjectNotSpecifiedError()
      }
      if (!environmentName) {
         throw new EnvironmentNotSpecifiedError()
      }

      const repository = this.getRepository()
      const environment = await repository.getEnvironment(
         subjectName,
         environmentName
      )

      clipboard.writeSync(environment)
      Logger.success(
         `Copied environment ${chalk.underline.bold(environmentName)} for subject ${chalk.underline.bold(subjectName)} to clipboard`
      )
   }
}
