import { CommandRegistry } from "./CommandRegistry"
import { BaseError } from "../errors/BaseError"
import { CommandNotFoundError } from "../errors/CommandNotFoundError"
import { RepositoryRegistry } from "./RepositoryRegistry"
import { RepositoryNotFoundError } from "../errors/RepositoryNotFoundError"
import { Logger } from "../logging/Logger"

export class WenviCli{
    constructor(
        private commands: CommandRegistry,
        private repositories: RepositoryRegistry
    ) {}
    
    public async run([,, commandName, ...parameters]: string[]): Promise<void> {
        try{

            const command = this.commands.get(commandName)
            const repository = this.repositories.get('local')
            
            if(!command){
                throw new CommandNotFoundError()
            }

            if(!repository){
                throw new RepositoryNotFoundError()
            }

            return await command.execute({
                repository,
                parameters
            })

        } catch(error){
            await this.handleError(error)
        }
    }

    public async handleError(error: BaseError | Error | unknown): Promise<void> {
        if(error instanceof BaseError){
            Logger.error(error.getMessage())            
            return
        }
        
        if(error instanceof Error){
            Logger.error(error.message)
            Logger.error(error.stack as string)
            return
        }

        console.error("Unknown error.")
        console.error(error)
    }
}