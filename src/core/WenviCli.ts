import { CommandRegistry } from "./CommandRegistry"
import { BaseError } from "../errors/BaseError"
import { CommandNotFoundError } from "../errors/CommandNotFoundError"
import { RepositoryRegistry } from "./RepositoryRegistry"
import { RepositoryNotFoundError } from "../errors/RepositoryNotFoundError"

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
            console.error(error.getMessage())
            console.error(error.getError())
            return
        }
        
        if(error instanceof Error){
            console.error(error.message)
            console.error(error.stack)
            return
        }

        console.error("Unknown error.")
        console.error(error)
    }
}