import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'
import { BaseCommand } from './BaseCommand'

export class ExampleCommand extends BaseCommand implements IExecutableCommand {
   public async execute(): Promise<void> {
      const repository = this.getRepository()
      
      if(await repository.isExampleCreated()){
         await this.showExampleFile()
         return
      }

      await this.createExampleFile()
   }

   private async showExampleFile(): Promise<void> {
      const repository = this.getRepository()
      const example = await repository.getExample()

      Logger.log("Seeing example file:\n")
      console.log(example)
   }

   private async createExampleFile(): Promise<void> {
      const repository = this.getRepository()

      await repository.createExample()

      Logger.success('Example file created sucessfully.')
   }
}
