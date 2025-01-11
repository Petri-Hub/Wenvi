import { SubjectNotSpecifiedError } from '../errors/SubjectNotSpecifiedError'
import { IExecutableCommand } from '../interfaces/ICommand'
import { CommandInput } from '../types/CommandInput'
import { BaseCommand } from './BaseCommand'

export class OpenCommand extends BaseCommand implements IExecutableCommand {
   public async execute({
      parameters: [subjectName, environmentName]
   }: CommandInput) {
      if (!subjectName) {
         throw new SubjectNotSpecifiedError()
      }

      const repository = this.getRepository()

      environmentName
         ? await repository.openEnvironment(subjectName, environmentName)
         : await repository.openSubject(subjectName)
   }
}
