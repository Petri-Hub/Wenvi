import { IRepository } from '../interfaces/IRepository'
import { CommandDependecies } from '../types/CommandDependecies'

export abstract class BaseCommand {
   private repository: IRepository

   constructor({ repository }: CommandDependecies) {
      this.repository = repository
   }

   protected getRepository(): IRepository {
      return this.repository
   }
}
