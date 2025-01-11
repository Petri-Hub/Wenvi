import PackageJsonProvider from '../core/PackageJsonProvider'
import open from 'open'
import { IExecutableCommand } from '../interfaces/ICommand'
import { Logger } from '../logging/Logger'

export class DocsCommand implements IExecutableCommand {
   constructor(private packageProvider = new PackageJsonProvider()) {}

   public async execute(): Promise<void> {
      await open(this.packageProvider.getDocumentationUrl())
      Logger.log('Opened documentation in browser.')
   }
}
