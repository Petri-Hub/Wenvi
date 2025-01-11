import { EnvironmentNotSpecifiedError } from '../errors/EnvironmentNotSpecifiedError'
import { SubjectNotSpecifiedError } from '../errors/SubjectNotSpecifiedError'
import { VariablesNotSpecifiedError } from '../errors/VariablesNotSpecifiedError'
import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'
import { CommandInput } from '../types/CommandInput'
import { BaseCommand } from './BaseCommand'

export class UpdateKeyCommand
   extends BaseCommand
   implements IExecutableCommand
{
   public async execute({
      parameters: [subjectName, environmentName, variableKey, variableValue]
   }: CommandInput) {
      if (!subjectName) {
         throw new SubjectNotSpecifiedError()
      }
      if (!environmentName) {
         throw new EnvironmentNotSpecifiedError()
      }
      if (!variableKey) {
         throw new VariablesNotSpecifiedError()
      }

      await this.getRepository().updateKey(
         subjectName,
         environmentName,
         variableKey,
         variableValue
      )

      Logger.log('Variable updated sucessfully')
   }
}
