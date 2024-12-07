import { CommandRegistry } from "./CommandRegistry"
import { BaseError } from "./errors/BaseError"
import { CommandNotFoundError } from "./errors/CommandNotFoundError"

export class WenviCli{
    constructor(private commandRegistry: CommandRegistry) {}
    
    public async run([,, commandName]: string[]): Promise<void> {
        try{

            const command = this.commandRegistry.get(commandName)
            
            if(!command){
                throw new CommandNotFoundError()
            }

            return await command.execute()

        } catch(error){
            await this.handleError(error)
        }
    }

    public async handleError(error: BaseError | Error | unknown): Promise<void> {
        if(error instanceof BaseError){
            console.error(error.getMessage())
        } else if(error instanceof Error){
            console.error(error.message)
        }

        console.error("Unknown error.")
    }
}